# Signal class

```js
const signal = new Signal("initial state"); // create a new Signal
const signalValue = signal.get(); // get Signal value
const signalSilentValue = signal.value; // get Signal value without registering dependencies

signal.set("new state"); // update Signal value
signal.compute((value) => value + " computed"); // update Signal value based on function
signal.value = "new state"; //!\\ update Signal value without triggering dependencies

signal.add(reactiveFunction); // manually add reactive function to signal dependencies
signal.delete(reactiveFunction); // clear the reactiveFunction in Signal dependencies
signal.clear(); // clear all Signal dependencies
```
