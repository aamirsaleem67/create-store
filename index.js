function todos(state = [], action) {
    switch(action.type) {
        case 'ADD_TODO': 
            return state.concat(action.todo);

        case'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.id)

        case 'TOGGLE_TODO':
            return state.map(todo => todo.id !== action.id ? todo: {
                ...todo,
                isCompleted: !todo.isCompleted
            })
    
        default:
            return state;
    }
}

function goals(state = [], action) {
    switch(action.type) {
        case 'ADD_GOAL': 
            return state.concat(action.goal);
            
        case'REMOVE_GOAL':
            return state.filter(goal => goal.id !== action.id)

        default:
            return state;
    }
}

function app(state = {}, action) {
    return {
        goals: goals(state.goals, action),
        todos: todos(state.todos, action)
    }
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