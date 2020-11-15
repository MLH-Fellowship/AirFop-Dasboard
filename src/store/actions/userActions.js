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
        dispatch({type:'LOGIN'})
    }
}
export const createUser = (user) => {
    return (dispatch, getState) => {
        // make call to db

        dispatch({type:'CREATE_USER', user})
    }
}