# Signal class

```js
const signal = new Signal("initial state"); // create a new Signal
const signalValue = signal.get(); // get the Signal value
const signalSilentValue = signal.value; // get the Signal value without registering dependencies

signal.set("new state"); // update the Signal value
signal.value = "new state"; //!\\ update the Signal value without triggering dependencies

signal.delete(reactiveFunction? /* optional */) // clear the Signal dependenc(y.ies)
```
