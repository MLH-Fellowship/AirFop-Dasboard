import React, {useState,useEffect} from 'react'
import {resetPassword, getUserById, getUserByEmail} from '../../store/actions/userActions'
import { connect } from 'react-redux'

const ResetPassword = ({user, resetUser, email}) => {
  // we have to get the user from the email when it loads andthen we will have the id to send the update to
    const [id,] = useState(1);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const onSubmit = (e) => {
      e.preventDefault()
      // we will have the id aftering gettting the user
      resetPassword(parseInt(1), password)
    }

    const validateForm = () => {
      return  password.length > 5 && password === password2;
    }

    useEffect(() => {
      if(!resetUser){
        let userEmail = email+="@us.af.mil"  
        // getUserByEmail(userEmail)
        getUserById(parseInt(1))
      }
    }, [resetUser])

    return (
      <div className="App">
        <div className="card p-30 m-30">
          <form onSubmit={e=>onSubmit(e)} style={{width:'70%', margin:'auto', padding:'20px'}}>
            <h1 style={{width:'70%', margin:'auto', padding:'20px', fontSize:'22px'}} className="grey-text">Reset password: {email+="@us.af.mil "}</h1>
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
                <button style={{width:'250px', margin:'30px 0'}} className={validateForm() ? "btn btn-block" : "disabledBtn"} disabled={!validateForm()}>RESET</button>
              </div>
              </div>
            </form>
          </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let param = ownProps.match.params.email
    return {
      user: state.user.user,
      email:param,
      resetUser:state.user.resetUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    resetPassword: (id, password) => dispatch(resetPassword(id, password)),
    getUserById: (id) => dispatch(getUserById(id)),
    getUserByEmail: (email) => dispatch(getUserByEmail(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
