// This is an example calling to JSON placeholder API
import {decryptJWT} from "../helpers/jwt";

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


// TODO work here for login
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
            console.log('res:',userInfo)
            console.log('sent:', JSON.stringify(user))
            const token = userInfo["token"];
            decryptJWT(token).then( userInfo => {

                if (userInfo !== null) {
                    console.log(`This is the parsed user: ${JSON.stringify(userInfo)}`);
                    user = {
                        id: userInfo['id'],
                        email: userInfo['email'],
                        first_name: userInfo['first_name'],
                        last_name: userInfo['last_name'],
                        isAdmin: userInfo['is_admin'],
                        isAuthenticated: true
                    }
                    console.log(`This is the user after the transform: ${JSON.stringify(user)}`);

                    const isAuthenticated = true;
                    const isAdmin = userInfo.is_admin;
                    dispatch({type:'LOGIN', user, isAuthenticated, isAdmin});
                }
            });
        })
        .catch((error) => {
            console.log(`The following error occurred during login: "${error}"`)
        });

    }
}

// TODO work here for logout
export const logout = () => {
    return (dispatch) => {
        // make call to db
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
            console.log('res:',json)
            console.log('sent:', JSON.stringify(user))

            // look for action.type 'EXAMPLE on line 9 of src/store/reducers/userReducer'
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
            console.log('res:',json)
            console.log('sent:', JSON.stringify(password))

            // look for action.type 'EXAMPLE on line 9 of src/store/reducers/userReducer'
            dispatch({type:'UPDATE_USER', password})
        }) 
        .catch((err)=>{
            console.log('error:', err)
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}

export const getUserById = (id) => {
    console.log('ekjnf', id)
    return (dispatch, getState) => {
        fetch(`/users/${id}`)
        .then(res => res.json())
        .then(user => {
            console.log(user)
            dispatch({ type:'GET_USER', id})
        }) 
        .catch((err)=>{
            console.log(err)
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}

export const getUserByEmail = (email) => {
    // this is not working yet
    console.log('getUserByEmail', email)
    return (dispatch, getState) => {
        fetch(`/user_by_email/${email}`)
        .then(res => res.json())
        .then(user => {
            console.log(user)
            dispatch({ type:'GET_USER', email})
        }) 
        .catch((err)=>{
            console.log(err)
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}