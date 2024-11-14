# Reactive class

```js
// create reactive function
const reactiveFunction = new Reactive(() =>
    console.log("The counter is: " + counter.get())
);

//!\\ create and use reactive function all in one
const result = Reactive.use(() =>
    console.log("The counter is: " + counter.get())
);

reactiveFunction.add(signal); // manually add reactive function to signal dependencies

// manually trigger reactive function and populate signals dependencies
const result = reactiveFunction.use(...args);

reactiveFunction.delete(signal); // clear the signal in Reactive dependencies
reactiveFunction.clear(); // clear all Reactive dependencies
```
