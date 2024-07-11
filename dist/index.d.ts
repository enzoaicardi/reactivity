declare module "reactivity/signal" {
    import { Reactive } from "reactivity/reactive";
    export class Signal<Type> {
        value: Type;
        constructor(value?: Type);
        /**
         * method used to retrieve the value of a signal
         * while adding the current reactive function to the dependencies
         * @returns {Type}
         */
        get(): Type;
        /**
         * method used to update the value of a signal
         * while triggering all the reactive functions in the dependencies
         * @param value the new signal value
         */
        set(value: Type): Type;
        /**
         * method used to remove a reactive function from dependencies
         * method used to remove all reactive functions from dependencies
         * @param reactive the reactive function to be deleted
         */
        delete(reactive?: Reactive): void;
    }
    export class ComputedSignal<Type> extends Signal<Type> {
        /** @see Signal.constructor */
        constructor(computation: (value: any) => Type);
        /**
         * @see Signal.set
         * executes the calculation function before returning the new value
         */
        set(value?: any): Type;
        /**
         * @see Signal.delete
         * remove the entry property before clearing dependencies
         */
        delete(reactive?: Reactive): void;
    }
}
declare module "reactivity/reactive" {
    import { Signal } from "reactivity/signal";
    export class Reactive {
        value: Function;
        static use: (func: Function, ...args: any) => any;
        constructor(func: Function);
        /**
         * method used to manually add the reactive function to signal dependencies
         * @param signal the signal in which to add the dependency
         */
        add(signal: Signal<any>): void;
        /**
         * method used to trigger the reactive function
         * while changing the value of the current reactive function
         * @param args the reactive function arguments
         * @returns {any} the reative function result
         */
        use(...args: any): any;
        /**
         * method used to remove a signal from dependencies
         * method used to remove all signals from dependencies
         * @param reactive the signal to be deleted
         */
        delete(signal?: Signal<any>): void;
    }
}
declare module "reactivity" {
    import { Reactive } from "reactivity/reactive";
    import { ComputedSignal, Signal } from "reactivity/signal";
    export { Signal as Signal, ComputedSignal as ComputedSignal, Reactive as Reactive, };
}
