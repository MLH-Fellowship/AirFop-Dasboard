import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
    return (
        <>
        <ul className='nav'>
            <li ><NavLink to="/">Home</NavLink></li>
            <li ><NavLink to="/">Link</NavLink></li>
            <li ><NavLink to="/">Link</NavLink></li>
            <li  style={{float:"right"}}><NavLink to="/">Right Link</NavLink></li>
        </ul>
        </>
    )
}

export default NavBar;