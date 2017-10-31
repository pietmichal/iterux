# Iterux
State container, for JavaScript applications, using arrays as a source of sequential updates.

Inspired by [Redux](https://github.com/reactjs/redux) and [Redux Zero](https://github.com/concretesolutions/redux-zero).

### todo
- Live example
- React bindings
- Iterux Cookbook

### Installation

#### npm
`npm install --save iterux`

#### yarn
`yarn add iterux`


### Example usage

```javascript
import { storeFactory } from 'iterux';

const store = storeFactory({ counter: 0 });

store.registerOnStateChangeCallback(state => console.log(state));

function increment(state) {
    return { counter: state.counter + 1 };
}

function decrement(state) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ counter: state.counter - 1 });
        }, 1000);
    });
}

function alterState() {
    return { altered: 'state' };
}

store.update([ increment, increment, decrement, decrement, increment, alterState ]); 
// state becomes: { counter: 2 }, { counter: 3 } ..., { counter: 2 }, { state: 'altered' } - every update overwrites the state!

```
