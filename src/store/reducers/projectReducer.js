import {projects} from '../../data/Data'
const initState = {
    projects:projects,
    // projects:[],
    greenSelected:false,
    yellowSelected:false,
    redSelected:false,
    startDate:null,
    endDate:null,
    showAll:true
}

const projectReducer = ( state = initState, action) => {
    switch(action.type){
        case "CREATE_PROJECT":
            console.log('created project', action.project);
            return {
                ...state,
                projects:[...state.projects, action.project]
            }
        case "UPDATE_PROJECT":
            console.log('update project', action.project);
            return {
                ...state,
                project: action.project
            }
        case "GET_PROJECTS":
            console.log('GET_PROJECTS', action.projects);
            return {
                ...state,
                projects:action.projects
            }
        case "GET_PROJECT_BY_ID":
            console.log('GET_PROJECT_BY_ID', action.id);
            return {
                ...state,
                project:action.project,
                id: action.id
            }
        case "UPDATE_GREEN_SELECTED":
            console.log('UPDATE_GREEN_SELECTED');
            return {
                ...state,
                greenSelected:action.value,
            }
        case "UPDATE_YELLOW_SELECTED":
            console.log('UPDATE_YELLOW_SELECTED');
            return {
                ...state,
                yellowSelected:action.value,
            }
        case "UPDATE_RED_SELECTED":
            console.log('UPDATE_RED_SELECTED');
            return {
                ...state,
                redSelected:action.value,
            }
        case "UPDATE_START_DATE":
            console.log('UPDATE_START_DATE', action.value);
            return {
                ...state,
                startDate:action.value,
            }
        case "UPDATE_END_DATE":
            console.log('UPDATE_END_DATE');
            return {
                ...state,
                endDate:action.value,
            }
        case "UPDATE_SHOW_ALL":
            console.log('UPDATE_SHOW_ALL');
            return {
                ...state,
                showAll:action.value,
            }
        default :
            return state;
    }
}

export default projectReducer;