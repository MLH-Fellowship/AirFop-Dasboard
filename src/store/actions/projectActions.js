import {projects} from '../../data/Data'

export const example = () => {
    return (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(res => res.json())
        .then(json => {
            console.log(json)
            // look for action.type 'EXAMPLE on line 9 of src/store/reducers/userReducer'
            dispatch({type:'EXAMPLE', example:json});
        }) 
        .catch((err)=>{
            dispatch({type:'EXAMPLE_ERROR', err})
        })
    }
}

export const createProject = (project) => {
    return (dispatch) => {
        const newProject = {
            project_name:project.projectName,
            phase:project.phase,
            award_date: project.award_date,
            pop:project.pop,
            customer: project.customer,
            contractor: project.contractor,
            pm: project.PM,
            status: project.status,
            status_comment: project.statusComment,
            name:project.name,
            number:project.number,
            funding: project.funding
        }

        fetch(`/projects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( newProject ),
        })
        .then((res) => res.json())
        .then(
            (result) => {
            console.log(result);
            dispatch({ type:'CREATE_PROJECT', result })
        })
        .catch((error)=>{
            console.log(error);
            dispatch({ type:'CREATE_PROJECT_ERROR', error })
        });
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

export const updateProject = (id, updatedProject) => {
    return (dispatch) => {
        fetch(`/project/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({updatedProject
            }),
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            dispatch({ type:'UPDATE_PROJECT', result })
        })
        .catch((error)=>{
            console.log(error);
            dispatch({ type:'UPDATE_PROJECT_ERROR', error })
        });
        // dispatch({ type:'UPDATE_PROJECT', updatedProject })
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