import projectReducer from './projectReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer
});

export default rootReducer;