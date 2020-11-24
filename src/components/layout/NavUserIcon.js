import React from 'react'
import {NavLink} from 'react-router-dom'
import {logout} from '../../store/actions/userActions'
import {connect} from 'react-redux'


const NavUserIcon = ({logout, user}) => {
    const name  =  user && user.email? user.email.substring(0, user.email.lastIndexOf("@")) : 'User'
    return (
        <div id="nav-user-icon">
            <li style={{ padding:'0', marginRight:'25px'}}>
                <NavLink to="/"><i className="fas fa-user-circle"></i> {name}</NavLink>
            </li>
            {user && <UserMenu logout={logout} user={user}/>}
        </div>
    )
}

export const UserMenu = ({logout, user}) => {
    return (

        <ul id="nav-user-dropdown">
            {user && user.email &&
                <li>
                    <p>{user.email}</p>
                </li>
            }
            <li>
            <a>reset password</a>
            </li>
            <li>
            <a onClick={logout}>logout</a>
            </li>
        </ul>

    )
}

const mapDispatchToProps = (dispatch) => {
    return{
      logout: () => dispatch(logout())
    }
}
export default connect(null,mapDispatchToProps)(NavUserIcon);

