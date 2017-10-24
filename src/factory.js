function storeFactory(initialState = {}) {

    let state = initialState;
    let onUpdateCallback = function() {};

    function update(callback) {
        state = callback(state);
        onUpdateCallback(state);
    }

    function multiUpdate(callback) {
        callback(update);
    }

    function onUpdate(callback) {
        updateCallback = callback;
        updateCallback(state);
    }

    return { update, multiUpdate, onUpdate };
    
}

module.exports = storeFactory;
