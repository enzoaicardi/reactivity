/** @internal */
export class Symbols {
    static readonly dependencies: unique symbol = Symbol();
    static readonly registered: unique symbol = Symbol();
    static readonly current: unique symbol = Symbol();
    static readonly initial: unique symbol = Symbol();
    static readonly computation: unique symbol = Symbol();
    static readonly reactive: unique symbol = Symbol();
}
