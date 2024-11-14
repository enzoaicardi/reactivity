import { test, expect } from "bun:test";
import { Reactive, Signal } from "../src/@enzoaicardi/reactivity";

test("signal: set, get, compute", () => {
    // init
    const signal = new Signal(0);
    expect(signal.get()).toBe(0);
    // update
    signal.set(1);
    expect(signal.get()).toBe(1);
    // compute
    signal.compute((value) => (value += 1));
    expect(signal.get()).toBe(2);
});

test("reactive: set, get, compute", () => {
    // init
    let number: number = 0;
    const signal = new Signal(0);
    const reactive = new Reactive(() => (number = signal.get()));
    reactive.use();
    expect(number).toBe(0);
    // update
    signal.set(1);
    expect(number).toBe(1);
    // compute
    signal.compute((value) => (value += 1));
    expect(number).toBe(2);
});
