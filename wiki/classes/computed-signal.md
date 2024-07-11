# ComputedSignal class

A computed signal is a signal whose value is determined by a function. This makes it possible to obtain values based on conditional logic while retaining state logic.

```js
// create a new ComputedSignal
const computedSignal = new ComputedSignal((value) => (value || "initial") + " state");

// get the ComputedSignal value
const computedSignalValue = computedSignal.get();

// get the ComputedSignal value without registering dependencies
const computedSignalSilentValue = computedSignal.value;

computedSignal.set("new"); // update the ComputedSignal value
computedSignal.value = "new state"; //!\\ update the ComputedSignal value without triggering dependencies

computedSignal.delete(reactiveFunction? /* optional */) // clear the ComputedSignal dependenc(y.ies)
```

If a computed signal contains references to other signals, then its value will be updated when the signal values change.

```js
const count = new Signal(0);
const countText = new ComputedSignal(() => "The counter is: " + count.get());
// countText.value === "The counter is: 0"

count.set(1);
// countText.value === "The counter is: 1"
```
