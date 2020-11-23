import React from 'react'
import {NavLink} from 'react-router-dom'
import {logout} from '../../store/actions/userActions'
import {connect} from 'react-redux'


const NavUserIcon = ({logout, user}) => {
    const name  =  user ? user.email.substring(0, user.email.lastIndexOf("@")) : 'User'
    return (
        <div id="nav-user-icon">
            <li style={{ padding:'0', marginRight:'25px'}}>
                <NavLink style={{fontSize:'20px'}} to="/"><i className="fas fa-user-circle"></i> {name}</NavLink>
            </li>
            <UserMenu logout={logout} email={user.email}/>
        </div>
    )
}

export const UserMenu = ({logout, email}) => {
    return (

        <ul id="nav-user-dropdown">
            <li>
            <a style={{color:'#333'}}>{email}</a>
            </li>
            <li>
            <a style={{color:'#333'}}>reset password</a>
            </li>
            <li>
            <a style={{color:'#333'}} onClick={logout}>logout</a>
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

