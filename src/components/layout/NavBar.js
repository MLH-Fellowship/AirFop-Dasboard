import React from 'react'
import {NavLink} from 'react-router-dom'
import AdminLinks from './AdminLinks'
import UserLinks from './UserLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import NavUserIcon from './NavUserIcon'
import Report from '../report/Report'

const NavBar = ({user, isAuthenticated, isAdmin, projects}) => {
    let links; 
    if(user && isAuthenticated && isAdmin){
        links = <AdminLinks user={user}/>
    }else if (user && isAuthenticated){
        links = <UserLinks/>
    }else {
        links=<SignedOutLinks/>
    }
    return (
        <>
        <ul className='nav'>
            <li className='left block'><NavLink to="/">Home</NavLink></li>
            {links}
            {projects && projects.length > 0 && 
                <ul className='right' style={{marginTop:'-6px', padding:'0'}}>
                    <li>
                        <Report projects={projects}/>
                    </li>
                </ul>   
            }
        </ul>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user.user, 
        isAuthenticated: state.user.isAuthenticated,
        isAdmin: state.user.isAdmin,
        projects: state.project.projects
    }
}

export default connect(mapStateToProps)(NavBar);