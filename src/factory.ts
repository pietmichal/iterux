
type updatesArray<State> = Array<(state: State) => State | Promise<State>>;
type onStateChangeCallback<State> = (state: State) => void;

type storeUpdateFn<State> = (updates: updatesArray<State>, iteration: number) => Promise<State>;
type storeRegisterOnStateChangeCallback<State> = (callback: onStateChangeCallback<State>) => void;

export interface Store<State> {
    update: storeUpdateFn<State>,
    registerOnStateChangeCallback: storeRegisterOnStateChangeCallback<State>,
}

export default function storeFactory<State>(initialState: State): Store<State> {
    
    let state: State = initialState;
    let onStateChangeCallback: onStateChangeCallback<State> = function() {};

    function update(updates: updatesArray<State>, iteration: number = 0): Promise<State> {
        return updates.length === iteration ? Promise.resolve(state) : Promise.resolve(updates[iteration](state))
            .then(updatedState => {
                state = updatedState;
                onStateChangeCallback(state);
                return update(updates, iteration + 1);                
            });
    }

    function registerOnStateChangeCallback(callback: onStateChangeCallback<State>): void {
        onStateChangeCallback = callback;
        onStateChangeCallback(state);
    }

    return { update, registerOnStateChangeCallback };
    
}
