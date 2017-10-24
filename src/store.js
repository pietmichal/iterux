export default class Store {
    
    constructor(initialState = {}, config = { freeze: false, exposeUpdateEvent: false }) {

        this.state = config.freeze ? Object.freeze(initialState) : initialState;
        this.freeze = config.freeze;
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
