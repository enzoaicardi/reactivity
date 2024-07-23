import { Reactive } from "./reactive";

export class Signal<Type> {
    value: Type;
    /** @internal */
    dependencies: Set<Reactive>;

    /**
     * create a signal
     * @param {Type?} value the inital signal state
     */
    constructor(value?: Type) {
        if (typeof value !== "undefined") {
            this.value = value;
        }
        this.dependencies = new Set();
    }

    /**
     * method used to retrieve the value of a signal
     * while adding the current reactive function to the dependencies
     * @returns {Type} the signal value
     */
    get(): Type {
        // retrieve the current reactive function
        const reactive = Reactive.current;

        if (reactive) {
            // add the reative function to dependencies
            this.dependencies.add(reactive);
            // add the signal to reactive function's dependencies
            reactive.dependencies.add(this);
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
            for (const reactive of this.dependencies) {
                reactive.use();
            }
        }
        // return the signal value
        return this.value;
    }

    /**
     * method used to remove a reactive function from dependencies or ...
     * method used to remove all reactive functions from dependencies
     * @param {Reactive?} reactive the reactive function to be cleared
     */
    delete(reactive?: Reactive): void {
        if (reactive) {
            // remove the reactive function from dependencies
            this.dependencies.delete(reactive);
            // remove the signal from reactive function's dependencies
            reactive.dependencies.delete(this);
        } else {
            // remove the signal from all reactive function's dependencies
            for (const reactive of this.dependencies) {
                reactive.dependencies.delete(this);
            }
            // clear all dependencies
            this.dependencies.clear();
        }
    }
}

export class ComputedSignal<Type> extends Signal<Type> {
    /** @internal */
    computation: (value: any) => Type;
    /** @internal */
    reactive: Reactive | undefined;
    /** @internal */
    entry: any;

    /**
     * @see Signal.constructor create a computed signal
     * @param {Function} computation the signal computation function
     */
    constructor(computation: (value: any) => Type) {
        super();
        this.computation = computation;
        this.reactive = new Reactive(() => this.set(this.entry));
        this.reactive.use();
    }

    /**
     * @see Signal.set executes the calculation function before returning the new value
     */
    set(value?: any): Type {
        // the current input is saved for signal recalculations
        this.entry = value;
        // get the computed result
        value = this.computation(value);
        // return Signal.set
        return super.set(value);
    }

    /**
     * @see Signal.delete remove the entry property before clearing dependencies
     */
    delete(reactive?: Reactive): void {
        // clear entry value
        delete this.entry;

        if (!reactive && this.reactive) {
            // clear reactive computation dependencies
            this.reactive.delete();
            delete this.reactive;
        }

        // clear dependencies
        super.delete(reactive);
    }
}
