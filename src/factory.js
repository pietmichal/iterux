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
        onUpdateCallback = callback;
        onUpdateCallback(state);
    }

    return { update, multiUpdate, onUpdate };
    
}

module.exports = storeFactory;
