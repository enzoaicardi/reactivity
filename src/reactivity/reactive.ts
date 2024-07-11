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

    // shortcut for constructor and instance.use
    // used to avoid static analysis warnings
    static use = (func: Function, ...args: any): any =>
        new Reactive(func).use(...args);

    constructor(func: Function) {
        this.value = func;
        this.dependencies = new Set();
        this.registered = false;
    }

    /**
     * method used to manually add the reactive function to signal dependencies
     * @param signal the signal in which to add the dependency
     */
    add(signal: Signal<any>): void {
        this.dependencies.add(signal);
        signal.dependencies.add(this);
    }

    /**
     * method used to trigger the reactive function
     * while changing the value of the current reactive function
     * @param args the reactive function arguments
     * @returns {any} the reative function result
     */
    use(...args: any): any {
        // the value of the current reactive function is changed only
        // when the function is triggered for the first time
        // so the function can be re-triggered manually without any side effects
        if (!this.registered) {
            this.registered = true;

            // switch the current reactive function
            Reactive.initial = Reactive.current;
            Reactive.current = this;

            const value = this.value(...args);

            // switch back the current reactive function to initial state
            Reactive.current = Reactive.initial;

            return value;
        } else {
            return this.value(...args);
        }
    }

    /**
     * method used to remove a signal from dependencies
     * method used to remove all signals from dependencies
     * @param reactive the signal to be deleted
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
