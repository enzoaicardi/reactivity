// Generated by dts-bundle-generator v9.5.1

export declare class Signal<Type> {
	value: Type;
	dependencies: Set<Reactive<AnyFunction>>;
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
	 * @param {Function} callback the new signal value
	 */
	compute(callback: (value: Type) => Type): Type;
	/**
	 * method used to manually add reactive function to signal dependencies
	 * @param {Reactive<AnyFunction>} reactive reactive function to add as signal dependency
	 */
	add(reactive: Reactive<AnyFunction>): this;
	/**
	 * method used to remove reactive function from dependencies
	 * @param {Reactive<AnyFunction>} reactive reactive function to be cleared
	 */
	delete(reactive: Reactive<AnyFunction>): boolean;
	/**
	 * method used to remove all reactive functions from dependencies
	 */
	clear(): void;
}
export type AnyFunction = (...args: any) => any;
export declare class Reactive<FunctionType extends AnyFunction = AnyFunction> {
	value: FunctionType;
	dependencies: Set<Signal<any>>;
	/**
	 * create a reactive function
	 * @param {Function} callback the reactive callback
	 */
	constructor(callback: FunctionType);
	/**
	 * method used to trigger the reactive function
	 * while changing the value of the current reactive function to null
	 * @param {Parameters<FunctionType>} args the reactive function arguments
	 * @returns {ReturnType<FunctionType>} the reative function result
	 */
	call(...args: Parameters<FunctionType>): ReturnType<FunctionType>;
	/**
	 * method used to trigger the reactive function
	 * while changing the value of the current reactive function to this
	 * @param {Parameters<FunctionType>} args the reactive function arguments
	 */
	bind(...args: Parameters<FunctionType>): this;
	/**
	 * method used to manually add reactive function to signal dependencies
	 * @param {Signal} signal the signal in which to add the dependency
	 */
	add(signal: Signal<any>): this;
	/**
	 * method used to remove signal from dependencies
	 * @param {Signal} signal the signal to be cleared
	 */
	delete(signal: Signal<any>): boolean;
	/**
	 * method used to remove all signals from dependencies
	 */
	clear(): void;
}

export {};
