import {projects} from '../../data/Data'

const initState = {
    projects,
    greenSelected:true,
    yellowSelected:true,
    redSelected:true,
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
        case "GET_PROJECTS":
            console.log('GET_PROJECTS', action.filters);
            return {
                ...state,
                filters:action.filters
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