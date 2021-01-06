import storage from 'redux-persist/lib/storage/session'
import { persistReducer } from 'redux-persist';

const initState = {
    user:{
        isAdmin:false,
        isAuthenticated: false
    },
    error:null
}

const persistConfig = {
    key: 'user',
    storage: storage,
    blacklist: ['error']
};

const userReducer = ( state = initState, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.user,
                isAuthenticated: action.isAuthenticated,
                isAdmin: action.isAdmin,
                error:""
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.error
            }
        case 'CLEAR_LOGIN_ERROR':
            return {
                ...state,
                error: null
            }
        case 'LOGOUT':
            return {
                ...state,
                user: false,
                isAuthenticated: false,
                isAdmin: false
            }
        case 'CREATE_USER':
            return {
                ...state,
                user: action.user
            }
        case 'UPDATE_USER':
            return {
                ...state
            }
        case 'GET_USER':
            return {
                ...state,
                restUser:action.id
            }
        default:
            return state
    }
}

export default persistReducer(persistConfig, userReducer);