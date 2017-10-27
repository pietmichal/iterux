# Iterux
State container, for JavaScript applications, using iterables as a source of updates.

Inspired by [Redux](https://github.com/reactjs/redux) and [Redux Zero](https://github.com/concretesolutions/redux-zero).

### todo
- implement new API

### Installation

`npm install --save micro-state`

### Example usage

```javascript
import stateFactory from 'micro-state/factory';

const state = stateFactory({ counter: 0 });

state.registerOnStateChangeCallback(state => console.log(state));

function increment(state) {
    return { counter: state.counter + 1 };
}

// Nothing stops you from making asynchronous calls.
// Just return a Promise, make it a generator or use async/await
function decrement(state) {
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
