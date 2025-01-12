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
     */
    constructor(callback: FunctionType) {
        this.value = callback;
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
     */
    bind(...args: Parameters<FunctionType>): this {
        // save the initial reactive function state
        Reactive[Symbols.initial] = Reactive[Symbols.current];
        // switch the current reactive function
        Reactive[Symbols.current] = this;

        // trigger the reactive function
        this.value(...args);

        // switch back the current reactive function to initial state
        Reactive[Symbols.current] = Reactive[Symbols.initial];

        return this;
    }

    /**
     * method used to manually add reactive function to signal dependencies
     * @param {Signal} signal the signal in which to add the dependency
     */
    add(signal: Signal<any>): this {
        // add the reactive function to signal's dependencies
        signal.dependencies.add(this);
        // add the signal to dependencies
        this.dependencies.add(signal);
        return this;
    }

    /**
     * method used to remove signal from dependencies
     * @param {Signal} signal the signal to be cleared
     */
    delete(signal: Signal<any>): boolean {
        // remove the reactive function from signal's dependencies
        signal.dependencies.delete(this);
        // remove the signal from dependencies
        return this.dependencies.delete(signal);
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
