# Reactivity.js

_A small modular interface for using signals in javascript_

[![NPM Version](https://img.shields.io/npm/v/@enzoaicardi/reactivity.svg?style=for-the-badge)](https://www.npmjs.com/package/@enzoaicardi/reactivity)
[![NPM Downloads](https://img.shields.io/npm/dm/@enzoaicardi/reactivity.svg?style=for-the-badge)](https://www.npmjs.com/package/@enzoaicardi/reactivity)
[![JSDelivr Hits](https://img.shields.io/jsdelivr/npm/hm/@enzoaicardi/reactivity?style=for-the-badge)](https://www.jsdelivr.com/package/npm/@enzoaicardi/reactivity)
[![Wiki](https://img.shields.io/badge/Wiki-Documentation-blue?style=for-the-badge)](https://github.com/enzoaicardi/reactivity/tree/main/wiki/README.md)

# What is a signal ?

> Largely inspired by the proposed [tc39 specification proposal](https://github.com/tc39/proposal-signals)

A signal is an object that represents a state, and has methods for retrieving the current state (reading the value) and methods for changing the state (writing the value).

When a signal's state is read, it retrieves the parent context and adds it to its dependencies. It can then update all its dependencies when its state changes.

Signals are often the most stable and easiest way to dynamically update data at no cost.

If this description sounds complicated, in practice using a signal is very simple. Here is a demonstration:

```js
// setup a signal (named counter) and a reactive function (named counterLog)
const counter = new Signal(0);
const counterLog = new Reactive(() => console.log(counter.get()));

// automatically bind counterLog dependencies
counterLog.bind(); // this will trigger counterLog and print "0" in the console
// or manually bind counterLog dependencies
counterLog.add(counter); // this will manually add counterLog to counter dependencies

counter.set(1); // this will trigger counterLog and print "1" in the console
counter.set(counter.value + 2); // this will trigger counterLog and print "3" in the console

counterLog.call(); // this will trigger counterLog and print "3" in the console
```

# List of all exports

-   [x] [Signal](https://github.com/enzoaicardi/reactivity/tree/main/wiki/classes/signal.md)
-   [x] [Reactive](https://github.com/enzoaicardi/reactivity/tree/main/wiki/classes/reactive.md)

```js
import {
    Signal, // used to create a signal
    Reactive, // used to create a reactive function
} from "@enzoaicardi/reactivity"; // cdn at https://cdn.jsdelivr.net/npm/@enzoaicardi/reactivity@latest/esm/reactivity.js
```

# Intallations

## NPM package

```bash
npm install @enzoaicardi/reactivity
```

```js
import { Signal, Reactive } from "@enzoaicardi/reactivity"; // es modules
const { Signal, Reactive } = require("@enzoaicardi/reactivity"); // commonjs modules
```

## CDN import

```js
// es modules
import {
    Signal,
    Reactive,
} from "https://cdn.jsdelivr.net/npm/@enzoaicardi/reactivity@latest/esm/reactivity.js";
```

```html
<!-- iife function execution -->
<script src="https://cdn.jsdelivr.net/npm/@enzoaicardi/reactivity@latest/iife/reactivity.js"></script>
<script>
    // global object destructuration
    const { Signal, Reactive } = Reactivity;
</script>
```
