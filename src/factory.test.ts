import test from 'ava';
import storeFactory from './factory';

test('factory function returns an object', t => {
    const store = storeFactory({ test: 0 });
    t.truthy(store);
    t.truthy(store.multiUpdate);
    t.truthy(store.onUpdate);
    t.truthy(store.update);
});

test('onUpdate function calls the callback function with current state as an argument', t => {
    const initialState = { test: 0 };
    const store = storeFactory(initialState);
    store.onUpdate(state => t.deepEqual(state, initialState));
});

test('update function provides current state as a callback argument', t => {
    const store = storeFactory({ test: 0 });
    store.update(state => {
        t.deepEqual(state, { test: 0 });
        return state;
    });
});

test('update function overrides the state using returned object from the callback', t => {
    const store = storeFactory({ test: 0 }); 
    const payload = { other: 100 };   
    store.update(() => payload as any);
    store.onUpdate(state => t.deepEqual(state, payload));            
});

test('update function triggers onUpdate callback', t => {
    t.plan(2);
    const callback = () => t.pass();
    const store = storeFactory({ test: 0 });
    store.onUpdate(callback);
    store.update(() => ({ test: 1 }));
});

test('multiUpdate function provides update function as a callback argument', t => {
    const store = storeFactory({ test: 0 });
    store.multiUpdate(update => t.is(update, store.update));    
});
