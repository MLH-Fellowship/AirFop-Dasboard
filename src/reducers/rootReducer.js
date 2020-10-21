import {projects} from '../data/Data'

const initState = {
    msg: 'root reducer connected!',
    projects
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