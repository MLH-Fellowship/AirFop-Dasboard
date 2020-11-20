import React, {useState} from 'react'
import ProjectsList from '../projects/ProjectsList'
import Filter from './Filter'
import { connect } from 'react-redux'
import {getProjects} from '../../store/actions/projectActions'
import {UserMenu} from '../layout/NavUserIcon'


const Dashboard = ({projects, myState}) => {
    const [displayProjects, setDisplayProjects] = useState(projects);

    console.log('state: ', myState)
    const filterProjects = (greenSelected, yellowSelected, redSelected, startDate, endDate) => {
        // instead of filtering the list, depending on how many projects there are, it might make snse to handle filtering with a db call. we may need pagination
        // exmpale of formating the date if we need to do that : const start =  moment(startDate).format("MM/dd/yyyy");
        let filteredProjects = projects;
        if(greenSelected === false){
            filteredProjects = filteredProjects.filter(project => {return project.status !== "green"})
        }
        if(yellowSelected === false){
            filteredProjects = filteredProjects.filter(project => {return project.status !== "yellow"})
        }
        if(redSelected === false){
            filteredProjects = filteredProjects.filter(project => {return project.status !== "red"})
        }
        setDisplayProjects(filteredProjects);
        console.log('g:',greenSelected,'y:',yellowSelected, 'r:', redSelected, 'start:', startDate, 'end:', endDate)
    }

    return (
        <div>
            {projects && projects.length > 0 && (
                <>
                <UserMenu/>
                <header style={{ marginBottom:'40px' }}>
                    <Filter filterProjects={filterProjects}  projects={displayProjects} showReportBtn={true} />
                </header>
                <div className='project-list'>
                    <ProjectsList projects={projects}/>
                </div>
                </>
            )}
            {(!projects || projects.length === 0) && 
                <div className="App">
                    <div className="card p-30 m-30">
                    <header className='m-20'>
                        <h1  className='grey-text fs-20'>Filter by status and/or date range to display matching projects</h1>
                        <UserMenu/>
                        <Filter filterProjects={filterProjects}  projects={[]} showReportBtn={false}/>
                    </header>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projects: state.project.projects,
        user: state.user.user,
        isAdmin: state.user.isAdmin,
        myState: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      getProjects: (filters) => dispatch(getProjects(filters))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);