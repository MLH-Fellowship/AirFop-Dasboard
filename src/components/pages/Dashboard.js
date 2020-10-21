import React from 'react'
import ProjectsList from '../projects/ProjectsList'
import { connect } from 'react-redux'
import { updateMsg } from '../../actions/projectActions'

const Dashboard = ({msg, updateMsg}) => {
    const onClick=()=>{
        const message = 'The Reducers and Actions are connected!'
        updateMsg(message);
    }
    return (
        <div>
            MSG: {msg}
            <button onClick={onClick}>CLICK ME!</button>
            <ProjectsList/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        msg: state.msg
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateMsg: (message) => { dispatch(updateMsg(message))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);