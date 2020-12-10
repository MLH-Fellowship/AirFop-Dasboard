import React, {useState,useEffect} from 'react'
import {resetPassword, getUserById} from '../../store/actions/userActions'
import { connect } from 'react-redux'

const ResetPassword = (id, user, resetUser) => {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const onSubmit = (e) => {
      e.preventDefault()
      console.log('id:',id.match.params.id)
      resetPassword(parseInt(id.match.params.id), password)
    }

    const validateForm = () => {
      return  password.length > 5 && password === password2;
    }

    useEffect(() => {
        console.log(id.match.params.id)
        if(!resetUser){
            getUserById(parseInt(id.match.params.id))
            console.log('!!!!!')
        }
    }, [resetUser])

    return (
      <div className="App">
        <div className="card p-30 m-30">
          <form onSubmit={e=>onSubmit(e)} style={{width:'70%', margin:'auto', padding:'20px'}}>
            <h1 style={{width:'70%', margin:'auto', padding:'20px'}} className="grey-text">Reset password user {id.match.params.id}</h1>
            {resetUser && resetUser.first_name}
            <div className='container'>
              <div className='field'>
                <input
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                  name="password"
                  minLength="6"
                  required
                />
              </div>
              <div className='field'>
                <input
                  className="form-input"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Confirm password"
                  type="password"
                  name="password2"
                  minLength="6"
                  required
                />
              </div>
              <div>
                <button style={{width:'250px', margin:'30px 0'}} className={validateForm() ? "btn btn-block" : "disabledBtn"} disabled={!validateForm()}>LOGIN</button>
              </div>
              </div>
            </form>
          </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let userId = ownProps.match.params.id
    return {
      user: state.user.user,
      id:userId,
      resetUser:state.user.resetUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    resetPassword: (id, password) => dispatch(resetPassword(id, password)),
    getUserById: (id) => dispatch(getUserById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
