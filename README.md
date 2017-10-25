# micro-store
Simpler take on state containers for JavaScript applications.

- Inspired by [Redux](https://github.com/reactjs/redux) and [Redux Zero](https://github.com/concretesolutions/redux-zero).
- Supports synchronous and asynchronous updates by providing simple API.
- Update functions are pure making them testable.
- Compatible with [TypeScript](https://github.com/Microsoft/TypeScript)
- React bindings included. (todo)

### Installation

`npm install --save micro-store`

### Example usage

```
import storeFactory from 'micro-store/factory';

const store = storeFactory({ counter: 0 });

store.onUpdate(state => console.log(state));

function increment(state) {
    return { counter: state.counter + 1 };
}

function decrement(state) {
    return { counter: state.counter - 1 };
}

// Synchronous updates
store.update(increment); // counter: 1

// Choose your favorite async flavor and make updates.
store.multiUpdate(async update => {

    store.update(increment); // counter: 2

    await exampleAsync();
    store.update(decrement); // counter: 1

    await exampleAsync();
    store.update(decrement); // counter: 0

});

```
