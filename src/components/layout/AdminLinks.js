import React from 'react'
import {NavLink} from 'react-router-dom'

const AdminLinks = () => {
    return (
        <>
        <ul className='right'>
            <li ><NavLink to="/">Admin Link 1</NavLink></li>
            <li ><NavLink to="/">Admin Link 2</NavLink></li>
            <li ><NavLink to="/">Admin User info</NavLink></li>
        </ul>
        </>
    )
}

export default AdminLinks;