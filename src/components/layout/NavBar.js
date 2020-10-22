import React from 'react'
import {NavLink} from 'react-router-dom'
import AdminLinks from './AdminLinks'
import UserLinks from './UserLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const NavBar = ({user, isAuthenticated, isAdmin}) => {
    let links; 
    if(user && isAuthenticated && isAdmin){
        links = <AdminLinks/>
    }else if (user && isAuthenticated){
        links = <UserLinks/>
    }else {
        links=<SignedOutLinks/>
    }
    return (
        <>
        <ul className='nav'>
            <li className='left'><NavLink to="/">Home</NavLink></li>
            {links}
        </ul>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user.user, 
        isAuthenticated: state.user.isAuthenticated,
        isAdmin: state.user.isAdmin
    }
}

export default connect(mapStateToProps)(NavBar);