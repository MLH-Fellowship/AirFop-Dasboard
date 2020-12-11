import React from 'react'
import {NavLink} from 'react-router-dom'
import AdminLinks from './AdminLinks'
import UserLinks from './UserLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import NavUserIcon from './NavUserIcon'
import Report from '../report/Report'

const NavBar = ({user, isAuthenticated, isAdmin, projects, project, showSearch}) => {
    let links; 
    if(user && isAuthenticated && isAdmin){
        links = <AdminLinks user={user}/>
    }else if (user && isAuthenticated){
        links = <UserLinks/>
    }else {
        links=<SignedOutLinks/>
    }
    
    const reportProjects= showSearch? project : projects;
    console.log('hey', showSearch, reportProjects)
    return (
        <>
        <ul className='nav'>
            <li className='left block'><NavLink to="/">Home</NavLink></li>
            {links}
            {((projects && projects.length > 0) || (showSearch) )&& 
                <ul className='right' style={{marginTop:'-4px', padding:'0'}}>
                    <li>
                        <Report projects={reportProjects}/>
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
        projects: state.project.projects,
        project: state.project.project,
        showSearch: state.project.showSearch
    }
}

export default connect(mapStateToProps)(NavBar);