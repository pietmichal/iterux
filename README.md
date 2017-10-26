# micro-state
Simple state abstraction for JavaScript applications.

- Inspired by [Redux](https://github.com/reactjs/redux) and [Redux Zero](https://github.com/concretesolutions/redux-zero).
- Written in [TypeScript](https://github.com/Microsoft/TypeScript).
- Has simple and yet powerful API allowing synchronous, asynchronous and *iterable* updates.

### todo
- implement new API
- react bindings
- state.update should return new state for testability sake

### Installation

`npm install --save micro-state`

### Example usage

```
import stateFactory from 'micro-state/factory';

const state = stateFactory({ counter: 0 });

state.registerOnStateChangeCallback(state => console.log(state));

function increment(state) {
    return { counter: state.counter + 1 };
}

function decrement(state) {
    // Nothing stops you from making asynchronous calls.
    // Just return a Promise or use async/await
    return Promise.resolve({ counter: state.counter - 1 });
}

function addMessage(state) {
    return { message: 'example' };
}

// update method accepts iterables only
state.update([ increment ]);
// state becomes: { counter: 1 }
state.update([ increment, increment, decrement, decrement, increment ]); 
// state becomes: { counter: 2 }, { counter: 3 } ..., { counter: 2 }
state.update(function* () {
    yield increment;
    yield increment;
    yield decrement;
    yield increment;
}());
// state becomes: { counter: 3 }, { counter: 4 } ..., { counter: 3 }

// Updates override the state!
state.update(addMessage); 
// state becomes: { message: 'example' }

```
