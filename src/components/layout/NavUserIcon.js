import React from 'react'
import {NavLink} from 'react-router-dom'
import {logout,resetPassword, example} from '../../store/actions/userActions'
import {connect} from 'react-redux'


const NavUserIcon = ({logout, first_name, last_name, email, example}) => {
    // const name  =  user && user.email? user.email.substring(0, user.email.lastIndexOf("@")) : 'User'
    return (
        <div id="nav-user-icon">
            <li style={{ padding:'0', marginRight:'25px'}}>
                <NavLink to="/"><i className="fas fa-user-circle"></i>{first_name} {last_name}</NavLink>
            </li>
             <UserMenu logout={logout} first_name={first_name} last_name={last_name} email={email} example={example}/>
        </div>
    )
}

export const UserMenu = ({logout, email, first_name, last_name, example}) => {
    return (
        <ul id="nav-user-dropdown">
            <li className="brigth-border-b">
                <p>{email}
                </p>
            </li>
            <li style={{margin:'0 20px'}}>
                <a>reset password</a>
            </li>
            <li style={{margin:'0 20px'}}>
                <a onClick={logout}>logout</a>
            </li>
        </ul>
    )
}
const mapStateToProps = (state) => {
    return {
        isAdmin: state.user.user.isAdmin,
        first_name: state.user.user.first_name,
        last_name: state.user.user.last_name,
        email: state.user.user.email, 
        id:state.user.user.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      logout: () => dispatch(logout()),
      resetPassword: (id, password) => dispatch(resetPassword(id, password)),
      example: () => dispatch(example())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavUserIcon);

