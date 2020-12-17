import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {getProjectById, getProjectByName, deleteProject,updateFilter, openFolder} from '../../store/actions/projectActions'
import {Redirect} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useToasts } from 'react-toast-notifications'

const ProjectDetails = ({project, deleteProject, isAdmin, name, getProjectByName, openFolder}) => {
    const [deleted, setDeleted]=useState(false);
    const { addToast } = useToasts()

    let className='';
    let statusLabel = '';

    if (project && project.status){
        switch (project.status){
            case 'Green':
             className='status status-green'
             statusLabel="G"
                break;
            case 'Yellow':
                className='status status-yellow'
                statusLabel="Y"
                break;
            case 'Red':
                className='status status-red'
                statusLabel='R'
                break
            default:
                className='status status-unknown'
                statusLabel='U'
        }    
    }

    const handleFolderClick = (e) => {
        e.preventDefault();
        openFolder(project.funding_source, project.project_name)
    }

    useEffect(() => {
        getProjectByName(name, false);
    }, [])

    const del = (e) => {
        e.preventDefault();
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui' id="confirm-delete">
                  <h1>Confirm</h1>
                  <p>Do you want to<b> DELETE</b> this project? <br/> This can not be undone.</p>
                  <button onClick={onClose}>Cancel</button>
                  <button
                    onClick={() => {
                        updateFilter('showSearch',false)
                        deleteProject(project.id)
                        setDeleted(true);
                        addToast('Project Deleted Successfully', { appearance: 'success',autoDismiss: true, autoDismissTimeout:3000 })
                        onClose();
                    }}
                  >
                   DELETE
                  </button>
                </div>
              );
            }
        });
    }

    if(deleted){
        return(
            <Redirect to="/"/>
        )
    } else{
    return (
        <div className="App">
            <div className="project-card project-card p-30 m-30">
            {project && (
                <>
                {
                    isAdmin && (
                        <div className='right'>
                            <Link to={'/edit/' + project.project_name} key={project.project_name}  className='action-icon blue-text'>
                                <i className="fas fa-pencil-alt"></i> <b>UPDATE</b>
                            </Link>
                            <span onClick={e=>del(e)} className='action-icon red-text'><i className="fas fa-trash-alt"></i> DELETE</span>
                        </div>
                    )
                } 
                <h1>{project.project_name}</h1>
                <table id="projectDetails">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Funding</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>
                    {project.name} 
                    </td>
                    <td>
                    {project.project_num}
                    </td>
                    <td>
                    {project.funding_source} 
                    </td>
                    <td>
                        <span className={className}>{statusLabel}</span>
                    </td>
                </tr>
                </tbody>
            </table>     
                </>
            )}
            <p 
                onClick={e => handleFolderClick(e)}
                className='folder'
            >
                <i className="far fa-folder-open"></i> 
            {" "}Open Project Folder
            </p>
            </div>
        </div>
    )}
}

const mapStateToProps = (state, ownProps) => {
    const projectName = ownProps.match.params.projectName;
    return {
        project: state.project.project[0],
        isAdmin: state.user.isAdmin,
        name:projectName
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateFilter: (label,value) => dispatch(updateFilter(label,value)),
        getProjectById: (id) => dispatch(getProjectById(id)),
        getProjectByName: (name, showSearch) => dispatch(getProjectByName(name, showSearch)),
        deleteProject: (id) => dispatch(deleteProject(id)),
        openFolder: (funding, project) => dispatch(openFolder(funding, project))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

