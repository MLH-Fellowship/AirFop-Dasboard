import React from 'react'
import {NavLink} from 'react-router-dom'
import {logout} from '../../store/actions/userActions'
import {connect} from 'react-redux'

const AdminLinks = ({logout}) => {
    const onClick = (e) => {
        e.preventDefault();
        logout();
    }
    return (
        <>
        <ul className='right'>
            <li ><NavLink to="/newproject">New Project</NavLink></li>
            <li ><NavLink to="/">Admin Link 2</NavLink></li>
            <li onClick={e=>onClick(e)}><NavLink to="/">Admin info</NavLink></li>
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