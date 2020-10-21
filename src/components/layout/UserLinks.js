import React from 'react'
import {NavLink} from 'react-router-dom'

const UserLinks = () => {
    return (
        <>
        <ul className='right'>
            <li ><NavLink to="/">User Link 1</NavLink></li>
            <li ><NavLink to="/">User Link 2</NavLink></li>
            <li ><NavLink to="/">User info</NavLink></li>
        </ul>
        </>
    )
}

export default UserLinks;