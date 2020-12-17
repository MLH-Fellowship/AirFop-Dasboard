import React from 'react'
import {NavLink} from 'react-router-dom'
import {logout,resetPassword} from '../../store/actions/userActions'
import { updateFilter } from '../../store/actions/projectActions'
import {connect} from 'react-redux'


const NavUserIcon = ({logout, email, id,}) => {
    const displayName  =  email? email.substring(0, email.lastIndexOf("@")) : 'User'
    return (
        <div id="nav-user-icon">
            <li style={{ padding:'0', marginRight:'25px'}}>
                <NavLink to="/"><i className="fas fa-user-circle" style={{fontSize:"24px", padding:"0 5px"}}></i><span  style={{fontSize:"18px", padding:"5px 0"}}>{displayName}</span></NavLink>
            </li>
             <UserMenu logout={logout} email={email} displayName={displayName} id={id}/>
        </div>
    )
}

export const UserMenu = ({logout, displayName, id}) => {
    const onLogout = (e) => {
        e.preventDefault();
        updateFilter('logout', true);
        logout();
    }
    return (
        <ul id="nav-user-dropdown">
            <li style={{margin:'0'}}>
                <NavLink to={`/reset/${displayName}`}>Reset Password</NavLink>
            </li>
            <li style={{margin:'0'}}>
                <a onClick={logout}>Logout</a>
            </li>
        </ul>
    )
}
const mapStateToProps = (state) => {
    return {
        isAdmin: state.user.user.isAdmin,
        email: state.user.user.email, 
        id:state.user.user.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      logout: () => dispatch(logout()),
      resetPassword: (id, password) => dispatch(resetPassword(id, password)),
      updateFilter: (label,value) => dispatch(updateFilter(label,value))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavUserIcon);

