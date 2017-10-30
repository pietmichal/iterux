# Iterux
State container, for JavaScript applications, using arrays as a source of sequential updates.

Inspired by [Redux](https://github.com/reactjs/redux) and [Redux Zero](https://github.com/concretesolutions/redux-zero).

### todo
- Implement new API
- Iterux Cookbook

### Installation

`npm install --save iterux`

### Example usage

```javascript
import storeFactory from 'iterux/factory';

const state = storeFactory({ counter: 0 });

state.registerOnStateChangeCallback(state => console.log(state));

function increment(state) {
    return { counter: state.counter + 1 };
}

function decrement(state) {
    return new Promise(resolve => {
        return { counter: state.counter - 1 };
    });
}

state.update([ increment ]);
// state becomes: { counter: 1 }

state.update([ increment, increment, decrement, decrement, increment ]); 
// state becomes: { counter: 2 }, { counter: 3 } ..., { counter: 2 }

state.update([ addMessage ]); 
// state becomes: { message: 'example' } - every value returned overwrites the state!

```
