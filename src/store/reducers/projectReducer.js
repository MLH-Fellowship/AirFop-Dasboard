import {projects} from '../../data/Data'
import storage from 'redux-persist/lib/storage/session'


import { persistReducer } from 'redux-persist';

const initState = {
    projects:[],
    project:[],
    greenSelected:true,
    yellowSelected:true,
    redSelected:true,
    startDate:null,
    endDate:null,
    quickSelect:"",
    showAll:true,
    showProjects:false,
    showSearch:false
}

const persistConfig = {
    key: 'project',
    storage: storage,
    blacklist: ['projects']
};

const projectReducer = ( state = initState, action) => {
    switch(action.type){
        case "CREATE_PROJECT":
            console.log('created project',action.project, action.r);
            return {
                ...state,
                response: action.r
            }
        case "UPDATE_PROJECT":
            console.log('UPDATE_PROJECT', action.res, action.project, action.id);
            return {
                ...state,
                update: action.project,
                project:[action.project]
            }
        case "GET_PROJECTS":
            console.log('GET_PROJECTS', action.projects);
            return {
                ...state,
                projects:action.projects,
                showProjects:true,
                showSearch:false
            }
        case "GET_PROJECT_BY_ID":
            console.log('GET_PROJECT_BY_ID', action.id);
            return {
                ...state,
                project:action.project,
                id: action.id
            }
        case "GET_PROJECT_BY_NAME":
            console.log('GET_PROJECT_BY_NAME');
            console.log(action.name, action.project);
            let searchProject=[];
            if(action.project && action.project[0]){
                searchProject=action.project;
            }
            if(action.showSearch){
                return {
                    ...state,
                    projects:[],
                    project:searchProject,
                    showSearch:true,
                    search:action.name
                }
            }else{
                return {
                    ...state,
                    projects:[],
                    project:searchProject,
                    search:action.name
                }
            }
            
        case "DELETE_PROJECT":
            console.log('DELETE_PROJECT');
            return {
                ...state,
                showSearch:false,
                search:null,
                project:[]
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
        case "UPDATE_QUICK_SELECT":
            console.log('UPDATE_QUICK_SELECT');
            return {
                ...state,
                quickSelect:action.value,
            }
        case "UPDATE_SHOW_ALL":
            console.log('UPDATE_SHOW_ALL');
            return {
                ...state,
                showAll:action.value,
            }
        case "UPDATE_SHOW_PROJECTS":
            console.log('UPDATE_SHOW_PROJECTS');
            return {
                ...state,
                showProjects:action.value
            }
        case "UPDATE_SHOW_SEARCH":
            console.log('UPDATE_SHOW_SEARCH');
            return {
                ...state,
                showSearch:action.value
            }
        case "LOGOUT":
            console.log('LOGOUT');
            return initState;
        default :
            return state;
    }
}

export default persistReducer(persistConfig, projectReducer);