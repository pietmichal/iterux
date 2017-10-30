export default function storeFactory<State>(initialState: State) {

    type onStateChangeCallback = (state: State) => void;
    type updatesArray = Array<(state: State) => State | Promise<State>>
    
    let state: State = initialState;
    let onStateChangeCallback: onStateChangeCallback = function() {};

    function update(updates: updatesArray, iteration: number = 0): Promise<State> {
        return updates.length === iteration ? Promise.resolve(state) : Promise.resolve(updates[iteration](state))
            .then(updatedState => {
                state = updatedState;
                onStateChangeCallback(state);
                return update(updates, iteration + 1);                
            });
    }

    function registerOnStateChangeCallback(callback: onStateChangeCallback): void {
        onStateChangeCallback = callback;
        onStateChangeCallback(state);
    }

    return { update, registerOnStateChangeCallback };
    
}
