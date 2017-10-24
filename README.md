# microstore
Micro state container for JavaScript applications.

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

store.update(increment); // counter: 1

store.multiUpdate(async update => {

    store.update(increment); // counter: 2

    await exampleAsync();
    store.update(decrement); // counter: 1

    await exampleAsync();
    store.update(decrement); // counter: 0

});

```