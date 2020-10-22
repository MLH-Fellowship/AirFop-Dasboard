import {projects} from '../../data/Data'

const initState = {
    projects
}

const projectReducer = ( state = initState, action) => {
    switch(action.type){
        case "CREATE_PROJECT":
            console.log('created project', action.project);
            return {
                ...state,
                projects:[...state.projects, action.project]
            }
        default :
            return state;
    }
}

export default projectReducer;