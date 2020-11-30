// This is an example calling to JSON placeholder API
export const example = () => {
    return (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(res => res.json())
        .then(json => {
            console.log(json)
            // look for action.type 'EXAMPLE on line 9 of src/store/reducers/userReducer'
            dispatch({type:'EXAMPLE', example:json});
        }) 
        .catch((err)=>{
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}

export const login = (credentials) => {
    return (dispatch, getState) => {
        // make call to db
        const user = {id:'001'}
        const isAuthenticated = true;
        const isAdmin = true;

        dispatch({type:'LOGIN', user, isAuthenticated, isAdmin})
    }
}
export const logout = () => {
    return (dispatch) => {
        // make call to db
        dispatch({type:'LOGOUT'})
    }
}
export const createUser = (user) => {
    return (dispatch, getState) => {
        // make call to db

        dispatch({type:'CREATE_USER', user})
    }
}