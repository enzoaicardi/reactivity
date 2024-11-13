declare module "@enzoaicardi/reactivity/symbols" { }
declare module "@enzoaicardi/reactivity/types" {
    export type AnyFunction = (...args: any[]) => any;
}
declare module "@enzoaicardi/reactivity/signal" {
    import { Reactive } from "@enzoaicardi/reactivity/reactive";
    import { AnyFunction } from "@enzoaicardi/reactivity/types";
    export class Signal<Type> {
        value: Type;
        /**
         * create a signal
         * @param {Type?} value the inital signal state
         */
        constructor(value?: Type);
        /**
         * method used to retrieve the value of a signal
         * while adding the current reactive function to the dependencies
         * @returns {Type} the signal value
         */
        get(): Type;
        /**
         * method used to update the value of a signal
         * while triggering all the reactive functions in the dependencies
         * @param {Type} value the new signal value
         */
        set(value: Type): Type;
        /**
         * method used to update the value of a signal using a custom function
         * while triggering all the reactive functions in the dependencies
         * @param {Function} func the new signal value
         */
        compute(func: (value: Type) => Type): void;
        /**
         * method used to remove a reactive function from dependencies
         * @param {Reactive} reactive the reactive function to be cleared
         */
        delete(reactive: Reactive<AnyFunction>): void;
        /**
         * method used to remove all reactive functions from dependencies
         */
        clear(): void;
    }
    export class ComputedSignal<Type> extends Signal<Type> {
        /**
         * @see Signal.constructor create a computed signal
         * @param {Function} computation the signal computation function
         */
        constructor(computation: (value: Type) => Type, initialValue: Type);
        /**
         * @see Signal.set executes the calculation function before returning the new value
         */
        set(value: Type): Type;
        /**
         * @see Signal.clear remove the entry property before clearing dependencies
         */
        clear(): void;
    }
}
declare module "@enzoaicardi/reactivity/reactive" {
    import { Signal } from "@enzoaicardi/reactivity/signal";
    import { AnyFunction } from "@enzoaicardi/reactivity/types";
    export class Reactive<FunctionType extends AnyFunction> {
        value: FunctionType;
        /**
         * create a reactive function
         * @param {Function} func the reactive callback
         */
        constructor(func: FunctionType);
        /**
         * method used to manually add the reactive function to signal dependencies
         * @param {Signal} signal the signal in which to add the dependency
         */
        add(signal: Signal<any>): void;
        /**
         * method used to trigger the reactive function
         * while changing the value of the current reactive function
         * @param {Parameters<FunctionType>} args the reactive function arguments
         * @returns {ReturnType<FunctionType>} the reative function result
         */
        use(...args: Parameters<FunctionType>): ReturnType<FunctionType>;
        /**
         * method used to remove a signal from dependencies
         * @param {Signal} signal the signal to be cleared
         */
        delete(signal: Signal<any>): void;
        /**
         * method used to remove all signals from dependencies
         */
        clear(): void;
    }
}
declare module "@enzoaicardi/reactivity" {
    import { Reactive } from "@enzoaicardi/reactivity/reactive";
    import { ComputedSignal, Signal } from "@enzoaicardi/reactivity/signal";
    export { Signal as Signal, ComputedSignal as ComputedSignal, Reactive as Reactive, };
}
