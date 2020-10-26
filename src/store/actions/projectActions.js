export const createProject = (project) => {
    return (dispatch, getState) => {
        //call to db
        dispatch({ type:'CREATE_PROJECT', project })
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
