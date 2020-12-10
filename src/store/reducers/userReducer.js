const initState = {
    user:{
        email:'myemail@airforce.gov',
        isAdmin:true,
        first_name:"Joan",
        last_name:"Jett",
        isAuthenticated: true,
        isAdmin:true,
        id:5
    }
}

const userReducer = ( state = initState, action) => {
    switch(action.type){
        case 'EXAMPLE':
            console.log('EXAMPLE: ', action.example)
            return {
                ...state,
                example: action.example
            }
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
        case 'CREATE_USER':
            console.log('CERATE_USER', action.user)
            return {
                ...state,
                user: action.user
            }
        case 'UPDATE_USER':
            console.log('UPDATE_USER', action.user)
            return {
                ...state
            }
        case 'GET_USER':
            console.log('GET_USER', action.id)
            return {
                ...state,
                restUser:action.id
            }
        default:
            return state
    }
}

export default userReducer;