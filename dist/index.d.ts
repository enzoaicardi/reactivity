declare module "reactivity/signal" {
    import { Reactive } from "reactivity/reactive";
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
         * method used to remove a reactive function from dependencies or ...
         * method used to remove all reactive functions from dependencies
         * @param {Reactive?} reactive the reactive function to be cleared
         */
        delete(reactive?: Reactive): void;
    }
    export class ComputedSignal<Type> extends Signal<Type> {
        /**
         * @see Signal.constructor create a computed signal
         * @param {Function} computation the signal computation function
         */
        constructor(computation: (value: any) => Type);
        /**
         * @see Signal.set executes the calculation function before returning the new value
         */
        set(value?: any): Type;
        /**
         * @see Signal.delete remove the entry property before clearing dependencies
         */
        delete(reactive?: Reactive): void;
    }
}
declare module "reactivity/reactive" {
    import { Signal } from "reactivity/signal";
    export class Reactive {
        value: Function;
        /**
         * shortcut for constructor and instance.use
         * used to avoid static analysis warnings
         * @param func the reactive callback
         * @param {...any?} args the reactive function arguments
         * @returns {any} the reative function result
         */
        static use: (func: Function, ...args: any) => any;
        /**
         * create a reactive function
         * @param {Function} func the reactive callback
         */
        constructor(func: Function);
        /**
         * method used to manually add the reactive function to signal dependencies
         * @param {Signal} signal the signal in which to add the dependency
         */
        add(signal: Signal<any>): void;
        /**
         * method used to trigger the reactive function
         * while changing the value of the current reactive function
         * @param {...any?} args the reactive function arguments
         * @returns {any} the reative function result
         */
        use(...args: any): any;
        /**
         * method used to remove a signal from dependencies or ...
         * method used to remove all signals from dependencies
         * @param {Signal?} signal the signal to be cleared
         */
        delete(signal?: Signal<any>): void;
    }
}
declare module "reactivity" {
    import { Reactive } from "reactivity/reactive";
    import { ComputedSignal, Signal } from "reactivity/signal";
    export { Signal as Signal, ComputedSignal as ComputedSignal, Reactive as Reactive, };
}
