import React, {useState} from 'react'
import ProjectsList from '../projects/ProjectsList'
import Filter from './Filter'
import Report from '../report/Report'
import { connect } from 'react-redux'
import {getProjects} from '../../store/actions/projectActions'


// might not need this var moment = require('moment');

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
            <header style={{ marginBottom:'40px' }}>
                <Filter filterProjects={filterProjects}  projects={displayProjects} />
                <div style={{ width:'130px', margin:'10px 40px' }}>
                    <Report projects={displayProjects} />
                </div>
            </header>
            <div className='project-list'>
                <ProjectsList projects={displayProjects}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projects: state.project.projects,
        myState: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      getProjects: (filters) => dispatch(getProjects(filters))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);