import test from 'ava';
import storeFactory from './factory';

test('factory function returns an object', t => {
    const store = storeFactory({});
    t.truthy(store);
    t.truthy(store.update);
    t.truthy(store.registerOnStateChangeCallback);    
});

test('store is intialised with provided state', async t => {
    const store = storeFactory({ counter: 0 });
    const result = await store.update([]);
    const expected = { counter: 0 };
    t.deepEqual(result, expected);
});
test('update accepts an array', async t => {
    const store = storeFactory({ counter: 0 });
    const result = await store.update([ 
        state => ({ counter: state.counter + 1 }),
        state => Promise.resolve({ counter: state.counter + 1 })
    ]);
    const expected = { counter: 2 };
    t.deepEqual(result, expected);
});

test('registered callback receives up to date state', async t => {
    t.plan(4);
    const store = storeFactory({ counter: 0 });
    const callback = state => t.pass();
    store.registerOnStateChangeCallback(callback);
    await store.update([ () => ({ counter: 1 }) ]);
    await store.update([ () => ({ counter: 1 }) ]);
    await store.update([ () => ({ counter: 2 }) ]);
});


test.todo('update accepts a generator');

