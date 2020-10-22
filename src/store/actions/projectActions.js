export const updateMsg = (msg) => {
    return { type:'UPDATE_MSG', payload:msg }
}

export const createProject = (project) => {
    return (dispatch, getState) => {
        //call to db
        dispatch({ type:'CREATE_PROJECT', project })
    }
}