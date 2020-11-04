import React, {useState} from 'react'
import ProjectsList from '../projects/ProjectsList'
import Filter from './Filter'
import Report from '../report/Report'
import { connect } from 'react-redux'


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
            <header >
                <Filter filterProjects={filterProjects}  projects={displayProjects} />
                <Report projects={displayProjects}/>
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
export default connect(mapStateToProps)(Dashboard);