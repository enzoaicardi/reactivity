import { Reactive } from "./reactive";
import { Symbols } from "./symbols";
import { AnyFunction } from "./types";

export class Signal<Type> {
    value: Type;
    /** @internal */
    [Symbols.dependencies]: Set<Reactive<AnyFunction>>;

    /**
     * create a signal
     * @param {Type?} value the inital signal state
     */
    constructor(value?: Type) {
        if (typeof value !== "undefined") {
            this.value = value;
        }
        this[Symbols.dependencies] = new Set();
    }

    /**
     * method used to retrieve the value of a signal
     * while adding the current reactive function to the dependencies
     * @returns {Type} the signal value
     */
    get(): Type {
        // retrieve the current reactive function
        const reactive = Reactive[Symbols.current];

        if (reactive) {
            // add the reative function to dependencies
            this[Symbols.dependencies].add(reactive);
            // add the signal to reactive function's dependencies
            reactive[Symbols.dependencies].add(this);
        }

        return this.value;
    }

    /**
     * method used to update the value of a signal
     * while triggering all the reactive functions in the dependencies
     * @param {Type} value the new signal value
     */
    set(value: Type): Type {
        // if the value has changed
        if (this.value !== value) {
            // update the value
            this.value = value;
            // trigger all the reactive functions in the dependencies
            for (const reactive of this[Symbols.dependencies]) {
                reactive.use();
            }
        }
        // return the signal value
        return this.value;
    }

    /**
     * method used to update the value of a signal using a custom function
     * while triggering all the reactive functions in the dependencies
     * @param {Function} func the new signal value
     */
    compute(func: (value: Type) => Type) {
        // get the computation result
        const computedValue = func(this.value);
        // update the value
        this.set(computedValue);
    }

    /**
     * method used to remove a reactive function from dependencies
     * @param {Reactive} reactive the reactive function to be cleared
     */
    delete(reactive: Reactive<AnyFunction>): void {
        // remove the reactive function from dependencies
        this[Symbols.dependencies].delete(reactive);
        // remove the signal from reactive function's dependencies
        reactive[Symbols.dependencies].delete(this);
    }

    /**
     * method used to remove all reactive functions from dependencies
     */
    clear(): void {
        // remove the signal from all reactive function's dependencies
        for (const reactive of this[Symbols.dependencies]) {
            reactive[Symbols.dependencies].delete(this);
        }
        // clear all dependencies
        this[Symbols.dependencies].clear();
    }
}

export class ComputedSignal<Type> extends Signal<Type> {
    /** @internal */
    [Symbols.computation]: (value: Type) => Type;
    /** @internal */
    [Symbols.reactive]: Reactive<AnyFunction>;
    /** @internal */
    entry: Type;

    /**
     * @see Signal.constructor create a computed signal
     * @param {Function} computation the signal computation function
     */
    constructor(computation: (value: Type) => Type, initialValue: Type) {
        super();
        this.entry = initialValue;
        this[Symbols.computation] = computation;
        this[Symbols.reactive] = new Reactive(() => this.set(this.entry));
        this[Symbols.reactive].use();
    }

    /**
     * @see Signal.set executes the calculation function before returning the new value
     */
    set(value: Type): Type {
        // the current input is saved for signal recalculations
        this.entry = value;
        // get the computed result
        const computedValue = this[Symbols.computation](value);
        // return Signal.set
        return super.set(computedValue);
    }

    /**
     * @see Signal.clear remove the entry property before clearing dependencies
     */
    clear(): void {
        // clear reactive computation dependencies
        if (this[Symbols.reactive]) {
            this[Symbols.reactive].clear();
        }
        // clear dependencies
        super.clear();
    }
}
