# Reactive class

```js
// create the reactive function
const reactiveFunction = new Reactive(() =>
    console.log("The counter is: " + counter.get())
);

//!\\ create and use the reactive function all in one
const result = Reactive.use(() =>
    console.log("The counter is: " + counter.get())
);

reactiveFunction.add(signal); // manually add the reactive function to signal dependencies

// manually trigger the reactive function and populate signals dependencies
const result = reactiveFunction.use(...args);

reactiveFunction.delete(signal? /* optional */) // clear the Signal dependenc(y.ies)
```
