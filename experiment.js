'use strict'

let window = {};

class Store {

    constructor(initialState = {}, config = { freeze: false, exposeUpdateEvent: false }) {

        this.state = config.freeze ? Object.freeze(initialState) : initialState;
        this.freeze = config.freeze;
        this.snapshots = config.snapshots;
        this.stateChangeCallback = () => {};
        this.update = this.update.bind(this);
        this.multiUpdate = this.multiUpdate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);                    

        if (config.exposeUpdateEvent) {
            window.___MICRO_STORE_ON_UPDATE___ = (state) => {};
            const _onUpdate = this.onUpdate;
            this.onUpdate = fn => {
                const _fn = fn;
                fn = (state) => {
                    _fn(state);
                    window.___MICRO_STORE_ON_UPDATE___(state);                    
                }
                _onUpdate(fn);
            };
        } 

        this.onUpdate(this.state);
        
    }

    update(fn) {
        const newState = Object.assign({}, this.state, fn(this.state));
        this.state = this.freeze ? Object.freeze(newState) : newState;
        this.stateChangeCallback(this.state);
    }

    multiUpdate(fn) {
        fn(this.update);
    }

    onUpdate(fn) {
        this.stateChangeCallback = fn;
    }

}

// Usage:
const examplePromise = () => new Promise(resolve => setTimeout(resolve, 5000));
const exampleDataFetch = () => new Promise(resolve => setTimeout(() => resolve([1, 2, 3]), Math.random() * 5000));
const store = new Store({ count: 0, data: [], status: 'pristine' }, { freeze: false, exposeUpdateEvent: false });
store.onUpdate(state => {
    console.log(state);
});
window.___MICRO_STORE_ON_UPDATE___ = (state) => console.log('global', state);

function increment(state) {
    return { count: state.count + 1 };
}

function decrement(state) {
    return { count: state.count - 1 };
}

function power(state) {
    return { count: Math.pow(state.count, 2) };
}

async function chained(update) {
    update(increment);
    await examplePromise();
    update(power);
    await examplePromise();
    update(decrement);
}

store.update(increment);
store.multiUpdate(chained);

async function fetchVideos(update) {
    update(() => ({ status: 'fetching', data: [] }));
    try {
        const data = await exampleDataFetch();
        update(() => ({ status: 'ready', data: data}));
    } catch (e) {
        update(() => ({ status: 'error' }));        
    }
}

store.multiUpdate(fetchVideos);

const customApi = {
    fetchData: exampleDataFetch,
};

function fetchVideoFactory(api) {
    return async function fetchVideo(update) {
        update(() => ({ status: 'fetching', data: [] }));
        try {
            const data = await api.fetchData();
            update(() => ({ status: 'ready', data: data }));
        } catch (e) {
            update(() => ({ status: 'error' }));        
        }
    }
}

setTimeout(() => {
    store.multiUpdate(fetchVideoFactory(customApi));
}, 4000);
