const initState = {
   user:{email:'my@e.mail', isAdmin:true},
   isAuthenticated: true,
   isAdmin:true
}

const userReducer = ( state = initState, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.user,
                isAuthenticated: action.isAuthenticated,
                isAdmin: action.isAdmin
            }
        case 'LOGOUT':
            return {
                ...state,
                user: false,
                isAuthenticated: false,
                isAdmin: false
            }
        default:
            return state
    }
}

export default userReducer;