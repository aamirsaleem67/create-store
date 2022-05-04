function todos(state, action) {
    if (action.type === 'ADD_TODO') {
        return state.concat(action.todo);
    }

    return state;
}

function createStore(reducer) {

    let state;
    let listeners = [];


    const subscribe = (listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    }

    const getState = () => state;

    return {
        getState,
        dispatch,
        subscribe
    }
}