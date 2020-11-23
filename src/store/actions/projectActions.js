import {projects} from '../../data/Data'

export const createProject = (project) => {
    return (dispatch, getState) => {
        //call to db
        dispatch({ type:'CREATE_PROJECT', project })
    }
}

export const getProjects = (filters) => {
    return (dispatch, getState) => {
        //call to db and set projects results 
        dispatch({ type:'GET_PROJECTS', projects })
    }
}

export const getProjectById = (id) => {
    return (dispatch, getState) => {
        //call to db and set projects results 
        dispatch({ type:'GET_PROJECT_BY_ID', id, project:{} })
    }
}

export const updateProject = (project) => {
    return (dispatch, getState) => {
        //call to db
        dispatch({ type:'UPDATE_PROJECT', project })
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
        case 'showAll':
            TYPE='UPDATE_SHOW_ALL'
            break;

        default: console.log("error")
    }
    return { type:TYPE, value }
}