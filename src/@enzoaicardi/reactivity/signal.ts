import { Reactive, type AnyFunction } from "./reactive";
import { Symbols } from "./symbols";

export class Signal<Type> {
    value: Type;
    dependencies = new Set<Reactive<AnyFunction>>();

    /**
     * create a signal
     * @param {Type?} value the inital signal state
     */
    constructor(value?: Type) {
        if (typeof value !== "undefined") {
            this.value = value;
        }
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
            // update dependencies
            this.add(reactive);
        }

        // return the signal value
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
            for (const reactive of this.dependencies) {
                reactive.call();
            }
        }
        // return the signal value
        return this.value;
    }

    /**
     * method used to update the value of a signal using a custom function
     * while triggering all the reactive functions in the dependencies
     * @param {Function} callback the new signal value
     */
    compute(callback: (value: Type) => Type): Type {
        // get the computation result
        const computedValue = callback(this.value);
        // update the value
        return this.set(computedValue);
    }

    /**
     * method used to manually add reactive function to signal dependencies
     * @param {Reactive<AnyFunction>} reactive reactive function to add as signal dependency
     */
    add(reactive: Reactive<AnyFunction>): this {
        // add the signal to reactive function's dependencies
        reactive.dependencies.add(this);
        // add the reactive function to dependencies
        this.dependencies.add(reactive);
        return this;
    }

    /**
     * method used to remove reactive function from dependencies
     * @param {Reactive<AnyFunction>} reactive reactive function to be cleared
     */
    delete(reactive: Reactive<AnyFunction>): boolean {
        // remove the signal from reactive function's dependencies
        reactive.dependencies.delete(this);
        // remove the reactive function from dependencies
        return this.dependencies.delete(reactive);
    }

    /**
     * method used to remove all reactive functions from dependencies
     */
    clear(): void {
        // remove the signal from all reactive function's dependencies
        for (const reactive of this.dependencies) {
            reactive.dependencies.delete(this);
        }
        // clear all dependencies
        this.dependencies.clear();
    }
}
