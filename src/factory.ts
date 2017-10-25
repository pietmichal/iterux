export default function storeFactory<State>(initialState: State) {

    type onUpdateCallback = (state: State) => void;
    type updateCallback = (state: State) => State;
    type multiUpdateCallback = (a: any) => void;
    
    let state: State = initialState;
    let onUpdateCallback: onUpdateCallback = function() {};

    function update(callback: updateCallback): void {
        state = callback(state);
        onUpdateCallback(state);
    }

    function multiUpdate(callback: multiUpdateCallback): void {
        callback(update);
    }

    function onUpdate(callback: onUpdateCallback): void {
        onUpdateCallback = callback;
        onUpdateCallback(state);
    }

    return { update, multiUpdate, onUpdate };
    
}
