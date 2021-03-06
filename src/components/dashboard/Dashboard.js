import React from 'react'
import ProjectsList from '../projects/ProjectsList'
import Filter from './Filter'
import { connect } from 'react-redux'
import {getProjects} from '../../store/actions/projectActions'


const Dashboard = ({projects, project, showSearch, search, showProjects}) => {

    const filterProjects = (greenSelected, yellowSelected, redSelected) => {
        let filteredProjects = projects;
        if(greenSelected === false){
            filteredProjects = filteredProjects.filter(project => {return project.status !== "Green"})
        }
        if(yellowSelected === false){
            filteredProjects = filteredProjects.filter(project => {return project.status !== "Yellow"})
        }
        if(redSelected === false){
            filteredProjects = filteredProjects.filter(project => {return project.status !== "Red"})
        }
    }

    const projectsList = showSearch ? project : projects

    return (
        <div>
            <header style={{ marginBottom:'40px' }}>
                <Filter filterProjects={filterProjects}  projects={projects} project={project} showReportBtn={true} />
            </header>
            {projectsList && projectsList.length > 0 && (showProjects || showSearch) && (
                <div className='project-list'>
                    <ProjectsList projects={projectsList}/>
                </div>
            )}

            {showSearch && projectsList.length === 0 && (
                <div className="card-light p-30 m-40 mt-50">
                    <header >
                        <h1  className='grey-text fs-20'>No results found with project name : {search}</h1>
                    </header>
                </div>
            )}
                
            {(projectsList.length === 0 || (!showProjects && !showSearch)) && 
                <div className="card-light p-30 m-40 mt-50">
                    <header >
                        <h1  className='grey-text fs-20'>Filter by status and/or date range to display matching projects</h1>
                    </header>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projects: state.project.projects,
        project: state.project.project,
        user: state.user.user,
        isAdmin: state.user.isAdmin,
        myState: state,
        greenSelected: state.project.greenSelected,
        yellowSelected: state.project.yellowSelected,
        redSelected: state.project.redSelected,
        startDate: state.project.startDate,
        endDate: state.project.endDate,
        showProjects: state.project.showProjects,
        showSearch: state.project.showSearch,
        search: state.project.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      getProjects: (filters) => dispatch(getProjects(filters))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

