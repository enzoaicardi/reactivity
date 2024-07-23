import { Signal } from "./signal";

export class Reactive {
    value: Function;
    /** @internal */
    dependencies: Set<Signal<any>>;
    /** @internal */
    registered: boolean;

    /** @internal */
    static current: Reactive | null = null;
    /** @internal */
    static initial: Reactive | null = null;

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
        this.dependencies = new Set();
        this.registered = false;
    }

    /**
     * method used to manually add the reactive function to signal dependencies
     * @param {Signal} signal the signal in which to add the dependency
     */
    add(signal: Signal<any>): void {
        this.dependencies.add(signal);
        signal.dependencies.add(this);
    }

    /**
     * method used to trigger the reactive function
     * while changing the value of the current reactive function
     * @param {...any?} args the reactive function arguments
     * @returns {any} the reative function result
     */
    use(...args: any): any {
        // save the initial reactive function state
        Reactive.initial = Reactive.current;
        // switch the current reactive function
        Reactive.current = this.registered ? null : this;

        // toggle registred status
        if (!this.registered) {
            this.registered = true;
        }

        // trigger the reactive function and store the value
        const value = this.value(...args);

        // switch back the current reactive function to initial state
        Reactive.current = Reactive.initial;

        return value;
    }

    /**
     * method used to remove a signal from dependencies or ...
     * method used to remove all signals from dependencies
     * @param {Signal?} signal the signal to be cleared
     */
    delete(signal?: Signal<any>): void {
        if (signal) {
            // remove the signal from dependencies
            this.dependencies.delete(signal);
            // remove the reactive function from signal's dependencies
            signal.dependencies.delete(this);
        } else {
            // remove the reactive function from all signals dependencies
            for (const signal of this.dependencies) {
                signal.dependencies.delete(this);
            }
            // clear all dependencies
            this.dependencies.clear();
        }
    }
}
