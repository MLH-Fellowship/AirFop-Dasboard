import React from 'react'
import {NavLink} from 'react-router-dom'
import {logout} from '../../store/actions/userActions'
import {connect} from 'react-redux'
import NavUserIcon from './NavUserIcon'

const UserLinks = ({logout}) => {
    const onClick = (e) => {
        e.preventDefault();
        logout();
    }
    return (
        <>
        <ul className='right'>
            <NavUserIcon logout={logout}/>
        </ul>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
      logout: () => dispatch(logout())
    }
  }
export default connect(null,mapDispatchToProps)(UserLinks);