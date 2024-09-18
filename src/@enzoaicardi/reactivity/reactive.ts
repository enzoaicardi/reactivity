import { Signal } from "./signal";
import { Symbols } from "./symbols";

export class Reactive {
    value: Function;
    /** @internal */
    [Symbols.dependencies]: Set<Signal<any>>;
    /** @internal */
    [Symbols.registered]: boolean;

    /** @internal */
    static [Symbols.current]: Reactive | null = null;
    /** @internal */
    static [Symbols.initial]: Reactive | null = null;

    /**
     * shortcut for constructor and instance.use
     * used to avoid static analysis warnings
     * @param func the reactive callback
     * @param {...any?} args the reactive function arguments
     * @returns {any} the reative function result
     */
    static use = (func: Function, ...args: any): any =>
        new Reactive(func).use(...args);

    /**
     * create a reactive function
     * @param {Function} func the reactive callback
     */
    constructor(func: Function) {
        this.value = func;
        this[Symbols.dependencies] = new Set();
        this[Symbols.registered] = false;
    }

    /**
     * method used to manually add the reactive function to signal dependencies
     * @param {Signal} signal the signal in which to add the dependency
     */
    add(signal: Signal<any>): void {
        this[Symbols.dependencies].add(signal);
        signal[Symbols.dependencies].add(this);
    }

    /**
     * method used to trigger the reactive function
     * while changing the value of the current reactive function
     * @param {...any?} args the reactive function arguments
     * @returns {any} the reative function result
     */
    use(...args: any): any {
        // save the initial reactive function state
        Reactive[Symbols.initial] = Reactive[Symbols.current];
        // switch the current reactive function
        Reactive[Symbols.current] = this[Symbols.registered] ? null : this;

        // toggle registered status
        if (!this[Symbols.registered]) {
            this[Symbols.registered] = true;
        }

        // trigger the reactive function and store the value
        const value = this.value(...args);

        // switch back the current reactive function to initial state
        Reactive[Symbols.current] = Reactive[Symbols.initial];

        return value;
    }

    /**
     * method used to remove a signal from dependencies
     * @param {Signal} signal the signal to be cleared
     */
    delete(signal: Signal<any>): void {
        // remove the signal from dependencies
        this[Symbols.dependencies].delete(signal);
        // remove the reactive function from signal's dependencies
        signal[Symbols.dependencies].delete(this);
    }

    /**
     * method used to remove all signals from dependencies
     */
    clear(): void {
        // remove the reactive function from all signals dependencies
        for (const signal of this[Symbols.dependencies]) {
            signal[Symbols.dependencies].delete(this);
        }
        // clear all dependencies
        this[Symbols.dependencies].clear();
    }
}
