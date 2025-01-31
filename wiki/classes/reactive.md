# Reactive class

```js
// create a new reactive function
const reactiveFunction = new Reactive(() =>
    console.log("The counter is: " + counter.get())
);
// create a new reactive function with dependencies
const reactiveFunction = new Reactive(() => /* ... */).add(signal).add(...);

// trigger reactive function and automatically bind dependencies
reactiveFunction.bind(...args);

reactiveFunction.add(signal); // manually add reactive function to signal dependencies

// manually trigger reactive function without binding dependencies
const result = reactiveFunction.call(...args);

reactiveFunction.delete(signal); // manually remove reactive function from signal dependencies
reactiveFunction.clear(); // clear all dependencies
```
