import React from 'react'
import {NavLink} from 'react-router-dom'
import AdminLinks from './AdminLinks'
import UserLinks from './UserLinks'
import SignedOutLinks from './SignedOutLinks'

const NavBar = () => {
    return (
        <>
        <ul className='nav'>
            <li className='left'><NavLink to="/">Home</NavLink></li>
            <SignedOutLinks/>
            <AdminLinks/>
            <UserLinks/>
        </ul>
        </>
    )
}

export default NavBar;