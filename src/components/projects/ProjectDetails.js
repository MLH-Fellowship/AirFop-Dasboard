import React, {useState, useEffect, useImperativeHandle} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {getProjectById, getProjectByName} from '../../store/actions/projectActions'
import FileDialouge from '../layout/FileDialouge'

const ProjectDetails = ({project, isAdmin, id,name, getProjectByName, ref}) => {
    const plusIconClass = "folderIcon far fa-plus-square "
    const minusIconClass = "folderIcon far fa-minus-square"
    // fas fa-folder-plus fas fa-folder-minus
    const [showI, setShowI]=useState(false);
    const [showII, setShowII]=useState(false);
    const [showIII, setShowIII]=useState(false);
    const [showIV, setShowIV]=useState(false);
    const [showV, setShowV]=useState(false);
    const [showVI, setShowVI]=useState(false);
    const [showMisc, setShowMisc]=useState(false);

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
    
    const handleClick = (e, func, value) => {
        e.preventDefault();
        func(value);
    }

    const handleFileClick = (e, file) => {
        e.preventDefault();
        let path = `/Users/me/mlh/AiFop/projects/${project.funding_source}/${project.project_name}/${file}`
        // setPath(`${path}/${file}`);
        console.log(path);
    }
    useEffect(() => {
        // getProjectById(id);
        getProjectByName(name);
    }, [])

    return (
        <div className="App">
            {/* <input id="fileInput" ref={ref} type="file" style={{display:"none"}} />
            <input type="button" value="Open" onClick={ useImperativeHandle(ref,() => ({
            handleClick}))} /> */}
            {/* <FileDialouge/> */}
            <div className="project-card project-card p-30 m-30">
            {project && (
                <>
                {
                    isAdmin && (
                        <div className='right'>
                            <Link to={'/edit/' + project.project_name} key={project.project_name}  className='action-icon blue-text'>
                                <i className="fas fa-pencil-alt"></i> <b>UPDATE</b>
                            </Link>
                            <span className='action-icon red-text'><i className="fas fa-trash-alt"></i> DELETE</span>
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
                    {project.number} 
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
                onClick={e => handleClick(e, setShowI, !showI)}
                className='folder'
            >
                <i className={showI ? minusIconClass : plusIconClass}></i> 
                PART I: SOURCE DOCUMENTS
            </p>
            {showI && (
                <div className='fileSubList'>
                    <p onClick={e => handleFileClick(e,"Requirements Approval Document" )} className='file'>Requirements Approval Document (RAD)</p>
                    <p className='file'>Quality Assurance Surveillance Plan (QASP)</p>
                    <p className='file'>Performance Work Statement(PWS) or Statement of Work (SOW)</p>
                    <p className='file'>Market Research Report</p>
                    <p className='file'>Justification & Approval (J&A)</p>
                    <p className='file'>COR Nomination & Training</p>
                    <p className='file'>Brand Name Justification </p>
                    <p className='file'>AF Form 9</p>
                </div>
            )}

            
            <p 
                onClick={e => handleClick(e, setShowII, !showII)}
                className='folder'
            >
                <i className={showII ? minusIconClass : plusIconClass}></i> 
                PART II: GENERAL CORRESPONDENCE
            </p>
            
            <p 
                onClick={e => handleClick(e, setShowIII, !showIII)}
                className='folder'
            >
                <i className={showIII ? minusIconClass : plusIconClass}></i>
                PART III: PROJECT SUPPORT AGREEMENT
            </p>
            
            <p 
                onClick={e => handleClick(e, setShowIV, !showIV)}
                className='folder'
            >
                <i className={showIV ? minusIconClass : plusIconClass}></i> 
                PART IV: ALLIED SUPPORT CONSTRUCTION
            </p>
            
            <p 
                onClick={e => handleClick(e, setShowV, !showV)}
                className='folder'
            >
                <i className={showV ? minusIconClass : plusIconClass}></i>
                PART V: COMMISSIONING DOCUMENTS
            </p>
            
            <p 
                onClick={e => handleClick(e, setShowVI, !showVI)}
                className='folder'
            >
                <i className={showVI ? minusIconClass : plusIconClass}></i> 
                PART VI: PROJECT PACKAGE/DRAWINGS
            </p>
            
            <p 
                onClick={e => handleClick(e, setShowMisc, !showMisc)}
                className='folder'
            >
                <i className={showMisc ? minusIconClass : plusIconClass}></i> 
                Miscellaneous
            </p>
            </div>
        </div>
    )
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
      getProjectById: (id) => dispatch(getProjectById(id)),
      getProjectByName: (name) => dispatch(getProjectByName(name))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

