export default function storeFactory<State>(initialState: State) {

    type onStateChangeCallback = (state: State) => void;
    type updatesArray = Array<(state: State) => State | Promise<State>>
    
    let state: State = initialState;
    let onStateChangeCallback: onStateChangeCallback = function() {};

     async function update(updates: updatesArray): Promise<State> {
        for (let u of updates) {
            const result = await Promise.resolve(u(state));
            state = result;
            onStateChangeCallback(state);
        }
        return state;
    }

    function registerOnStateChangeCallback(callback: onStateChangeCallback): void {
        onStateChangeCallback = callback;
        onStateChangeCallback(state);
    }

    return { update, registerOnStateChangeCallback };
    
}
