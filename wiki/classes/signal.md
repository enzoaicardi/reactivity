# Signal class

```js
const signal = new Signal("initial state"); // create a new signal
const signal = new Signal("initial state").add(reactiveFunction, ...); // create a new signal with dependencies
const signalValue = signal.get(); // get signal value
const signalSilentValue = signal.value; // get signal value without triggering dependencies

signal.set("new state"); // update Signal value
signal.compute((value) => value + " computed"); // update signal value based on function
signal.value = "new state"; //!\\ update Signal value without triggering dependencies

signal.add(reactiveFunction); // manually add reactive function to signal dependencies
signal.delete(reactiveFunction); // manually remove reactiveFunction from Signal dependencies
signal.clear(); // clear all dependencies
```
