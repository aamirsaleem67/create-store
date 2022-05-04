function createStore() {

    let state;
    let listeners = [];

    const subscribe = (listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }


    const getState = () => state;

    return {
        getState,
        subscribe
    }
}