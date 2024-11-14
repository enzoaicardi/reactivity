import { test, expect } from "bun:test";
import { Reactive, Signal } from "../src/@enzoaicardi/reactivity";
import { Symbols } from "../src/@enzoaicardi/reactivity/symbols";

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

test("dependencies: auto, add, delete, clear", () => {
    const signalAuto = new Signal(0);
    const signalManual = new Signal(0);
    const reactive = new Reactive(() => signalAuto.get());
    reactive.use();
    // auto
    expect(reactive[Symbols.dependencies].size).toBe(1);
    expect(signalAuto[Symbols.dependencies].size).toBe(1);
    // add
    reactive.add(signalManual);
    expect(reactive[Symbols.dependencies].size).toBe(2);
    expect(signalManual[Symbols.dependencies].size).toBe(1);
    // delete
    reactive.delete(signalAuto);
    expect(reactive[Symbols.dependencies].size).toBe(1);
    expect(signalAuto[Symbols.dependencies].size).toBe(0);
    // clear
    signalManual.clear();
    expect(reactive[Symbols.dependencies].size).toBe(0);
    reactive.add(signalManual);
    reactive.clear();
    expect(reactive[Symbols.dependencies].size).toBe(0);
});
