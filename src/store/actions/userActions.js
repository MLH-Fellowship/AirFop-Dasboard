import {decryptJWT, setCookies, clearCookies} from "../helpers/jwt";

export const login = (credentials) => {
    return (dispatch, getState) => {
        let user = {
            email: credentials.email,
            password: credentials.password
        };
        fetch('/sessions', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            if (res.status !== 201) {
                return Promise.reject('The credentials provided are not valid');
            }
            return res.json()
        })
            // Will execute when the user provides valid credentials
        .then(userInfo => {
            const token = userInfo["token"];
            decryptJWT(token).then( userInfo => {

                if (userInfo !== null) {
                    user = {
                        id: userInfo['id'],
                        email: userInfo['email'],
                        first_name: userInfo['first_name'],
                        last_name: userInfo['last_name'],
                        isAdmin: userInfo['is_admin'],
                        isAuthenticated: true
                    }
                    const isAuthenticated = true;
                    const isAdmin = userInfo.is_admin;
                    setCookies(user);
                    dispatch({type:'LOGIN', user, isAuthenticated, isAdmin});
                }
            });
        })
        .catch((error) => {
            console.error(`The following error occurred during login: "${error}"`)
            dispatch({type:'LOGIN_ERROR', error});
        });
    }
}

export const clearLoginError = () =>{
    return (dispatch) => {
        dispatch({type:'CLEAR_LOGIN_ERROR'})
    }
}

export const logout = () => {
    return (dispatch) => {
        // make call to db
        clearCookies();
        dispatch({type:'LOGOUT'})
    }
}
export const createUser = (user) => {
    return (dispatch, getState) => {
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(json => {
            dispatch({type:'CREATE_USER', user})
        }) 
        .catch((err)=>{
            console.log('error:', err)
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}


export const resetPassword = (id, password) => {
    return (dispatch, getState) => {
        fetch(`/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({password:password})
        })
        .then(res => res.json())
        .then(json => {
            dispatch({type:'UPDATE_USER', password})
        }) 
        .catch((err)=>{
            console.log('error:', err)
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}

export const getUserById = (id) => {
    return (dispatch, getState) => {
        fetch(`/users/${id}`)
        .then(res => res.json())
        .then(user => {
            dispatch({ type:'GET_USER', id})
        }) 
        .catch((err)=>{
            console.log(err)
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}

export const getUserByEmail = (email) => {
    return (dispatch, getState) => {
        fetch(`/user_by_email/${email}`)
        .then(res => res.json())
        .then(user => {
            dispatch({ type:'GET_USER', email})
        }) 
        .catch((err)=>{
            console.log(err)
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}