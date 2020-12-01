import React from 'react'
import {NavLink} from 'react-router-dom'
import {logout} from '../../store/actions/userActions'
import {connect} from 'react-redux'
import NavUserIcon from './NavUserIcon'

const AdminLinks = ({logout, user}) => {
    const onClick = (e) => {
        e.preventDefault();
        logout();
    }
    return (
        <>
        <ul className='right'>
            <li><NavLink to="/newproject">New Project</NavLink></li>
            <li><NavLink to="/newuser">New User</NavLink></li>
            {/* <li style={{fontSize:'20px'}} onClick={e=>onClick(e)}><NavLink to="/"><i className="fas fa-user-circle"></i></NavLink></li> */}
            <NavUserIcon user={user}/>
        </ul>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
      logout: () => dispatch(logout())
    }
}

export default connect(null,mapDispatchToProps)(AdminLinks);