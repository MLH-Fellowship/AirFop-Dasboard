const initState = {
    msg: 'root reducer connected!'
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'UPDATE_MSG'){
        return {
            ...state,
            msg : action.payload
        }    
    }
    return state;
}

export default rootReducer;