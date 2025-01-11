import { Signal } from "./signal";
import { Symbols } from "./symbols";

export type AnyFunction = (...args: any) => any;

export class Reactive<FunctionType extends AnyFunction = AnyFunction> {
    value: FunctionType;
    dependencies = new Set<Signal<any>>();

    /** @internal */
    static [Symbols.current]: Reactive<AnyFunction> | null = null;
    /** @internal */
    static [Symbols.initial]: Reactive<AnyFunction> | null = null;

    /**
     * create a reactive function
     * @param {Function} callback the reactive callback
     * @param {Signal<any>[]?} signals the dependencies
     */
    constructor(callback: FunctionType, signals?: Signal<any>[]) {
        this.value = callback;
        if (signals) {
            this.add(...signals);
        }
    }

    /**
     * method used to trigger the reactive function
     * while changing the value of the current reactive function to null
     * @param {Parameters<FunctionType>} args the reactive function arguments
     * @returns {ReturnType<FunctionType>} the reative function result
     */
    call(...args: Parameters<FunctionType>): ReturnType<FunctionType> {
        // save the initial reactive function state
        Reactive[Symbols.initial] = Reactive[Symbols.current];
        // switch the current reactive function
        Reactive[Symbols.current] = null;

        // trigger the reactive function and store the value
        const value = this.value(...args);

        // switch back the current reactive function to initial state
        Reactive[Symbols.current] = Reactive[Symbols.initial];

        return value;
    }

    /**
     * method used to trigger the reactive function
     * while changing the value of the current reactive function to this
     * @param {Parameters<FunctionType>} args the reactive function arguments
     * @returns {ReturnType<FunctionType>} the reative function result
     */
    bind(...args: Parameters<FunctionType>): ReturnType<FunctionType> {
        // save the initial reactive function state
        Reactive[Symbols.initial] = Reactive[Symbols.current];
        // switch the current reactive function
        Reactive[Symbols.current] = this;

        // trigger the reactive function and store the value
        const value = this.value(...args);

        // switch back the current reactive function to initial state
        Reactive[Symbols.current] = Reactive[Symbols.initial];

        return value;
    }

    /**
     * method used to manually add reactive function to signals dependencies
     * @param {Signal[]} signals the signals in which to add the dependency
     */
    add(...signals: Signal<any>[]): void {
        for (const signal of signals) {
            // add the signal to dependencies
            this.dependencies.add(signal);
            // add the reactive function to signal's dependencies
            signal.dependencies.add(this);
        }
    }

    /**
     * method used to remove signals from dependencies
     * @param {Signal[]} signals the signals to be cleared
     */
    delete(...signals: Signal<any>[]): void {
        for (const signal of signals) {
            // remove the signal from dependencies
            this.dependencies.delete(signal);
            // remove the reactive function from signal's dependencies
            signal.dependencies.delete(this);
        }
    }

    /**
     * method used to remove all signals from dependencies
     */
    clear(): void {
        // remove the reactive function from all signals dependencies
        for (const signal of this.dependencies) {
            signal.dependencies.delete(this);
        }
        // clear all dependencies
        this.dependencies.clear();
    }
}
