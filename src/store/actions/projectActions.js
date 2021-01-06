import {projects} from '../../data/Data'
import axios from 'axios'

export const createProject = (project) => {
    return (dispatch, getState) => {
        fetch(`/projects` , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        })
        .then(res => res.json())
        .then(r => {
            dispatch({ type:'CREATE_PROJECT', r, project })
        }) 
        .catch((err)=>{
            console.log(err)
            dispatch({type:'CREATE_PROJECT', err})
        })
    }
}

export const getProjects = (filter) => {
    return (dispatch, getState) => {
        axios.get(`/query`, {
            params:{
                status:filter.stauts,
                Red:filter.Red,
                Yellow:filter.Yellow,
                Green:filter.Green,
                date:filter.date,
                start:filter.start,
                end:filter.end
            }
        })
        .then(res => {
        dispatch({ type:'GET_PROJECTS', projects:res.data})
        })
    }
}

export const getProjectById = (id) => {
    return (dispatch, getState) => {
        fetch(`/projects/${id}`)
        .then(res => res.json())
        .then(project => {
            dispatch({ type:'GET_PROJECT_BY_ID', id, project })
        }) 
        .catch((err)=>{
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}

export const deleteProject = (id) => {
    return (dispatch) => {
        fetch(`/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(json => {
            dispatch({ type:'DELETE_PROJECT', id, json })
        }) 
        .catch((err)=>{
            console.log('dpe', err)
            dispatch({type:'DELETE_PROJECT', err})
        })
    }
}

export const getProjectByName = (name, isSearch) => {
    return (dispatch, getState) => {
        fetch(`/proj_by_name/${name}`)
        .then(res => res.json())
        .then(project => {
            const dispatchObject = {type:'GET_PROJECT_BY_NAME', name, project}
            if(isSearch){
                dispatchObject.showSearch = true
            }
            dispatch(dispatchObject)
        }) 
        .catch((err)=>{
            console.log(err)
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}

export const openFolder = (funding, project) => {
    return (dispatch) => {
        fetch(`/open/${funding}/${project}`)
        .then(res => res.json())
        .then(project => {
            dispatch({ type:'OPEN_FOLDER', funding, project })
        }) 
        .catch((err)=>{
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}

export const updateProject = (id, project) => {
    return (dispatch, getState) => {
        fetch(`/projects/${id}` , {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        })
        .then(res => res.json())
        .then(res => {
            dispatch({ type:'UPDATE_PROJECT', project, id, res })
        }) 
        .catch((err)=>{
            console.log('error', err, project)
            dispatch({ type:'UPDATE_PROJECT', project, id, err })
        })
    }
}

export const updateFilter = (filter, value) => {

    let TYPE;
    switch (filter){
        case 'green':
            TYPE='UPDATE_GREEN_SELECTED'
            break;
        case 'yellow':
            TYPE='UPDATE_YELLOW_SELECTED'
            break;
        case 'red':
            TYPE='UPDATE_RED_SELECTED'
            break;
        case 'start':
            TYPE='UPDATE_START_DATE'
            break;
        case 'end':
            TYPE='UPDATE_END_DATE'
            break;
        case 'quick':
            TYPE='UPDATE_QUICK_SELECT'
            break;
        case 'showAll':
            TYPE='UPDATE_SHOW_ALL'
            break;
        case 'showProjects':
            TYPE='UPDATE_SHOW_PROJECTS'
            break;
        case 'showSearch':
            TYPE='UPDATE_SHOW_SEARCH'
            break;
        case 'logout':
            TYPE='LOGOUT'
            break;
        default: console.log("error")
    }
    return { type:TYPE, value }

}