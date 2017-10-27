export default function storeFactory<State>(initialState: State) {

    type onStateChangeCallback = (state: State) => void;
    type updateArray = Array<(state: State) => State | Promise<State>>
    
    let state: State = initialState;
    let onStateChangeCallback: onStateChangeCallback = function() {};

    async function update(array: updateArray): Promise<State> {

        array.forEach(async updateFn => {
            const result = await Promise.resolve(updateFn(state));
            state = result;
            onStateChangeCallback(state);
        });

        return state;
    }

    function registerOnStateChangeCallback(callback: onStateChangeCallback): void {
        onStateChangeCallback = callback;
        onStateChangeCallback(state);
    }

    return { update, registerOnStateChangeCallback };
    
}
