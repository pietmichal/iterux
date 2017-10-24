# micro-store
Simpler take on state containers for JavaScript applications.

- Simpler take on state containers inspired by [Redux](https://github.com/reactjs/redux) and [Redux Zero](https://github.com/concretesolutions/redux-zero).
- Supports synchronous and asynchronous updates by providing simple API.
- Update functions are pure making them testable.
- No magic ✨ 🚫
- Simple terminology: ~~actions, reducers, store~~ -> updates, state
- [TypeScript](https://github.com/Microsoft/TypeScript) typings included. (todo)
- [Flow-Typed](https://github.com/flowtype/flow-typed) typings included. (todo)
- React bindings included. (todo)

### Installation

`npm install --save micro-store`

### Example usage

```
import { Store } from 'micro-store';

const store = new Store({ counter: 0 });

store.onUpdate(state => console.log(state));

function increment(state) {
    return { counter: state.counter + 1 };
}

function decrement(state) {
    return { counter: state.counter - 1 };
}

// Synchronous updated
store.update(increment); // counter: 1

// Choose your favorite async flavor
store.multiUpdate(async update => {

    store.update(increment); // counter: 2

    await exampleAsync();
    store.update(decrement); // counter: 1

    await exampleAsync();
    store.update(decrement); // counter: 0

});

```
