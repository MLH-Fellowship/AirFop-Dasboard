import React from 'react'
import ItemsList from '../components/ItemsList'
import { connect } from 'react-redux'
import { updateMsg } from '../actions/itemActions'

const Dashboard = ({msg, updateMsg}) => {
    const onClick=()=>{
        const message = 'The Reducers and Actions are connected!'
        updateMsg(message);
    }
    return (
        <div>
            MSG: {msg}
            <button onClick={onClick}>CLICK ME!</button>
            <ItemsList/>
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