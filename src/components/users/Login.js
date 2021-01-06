import React, { useState } from 'react'
import {login, clearLoginError} from '../../store/actions/userActions'
import {connect} from 'react-redux'

const Login = ({login, error}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState("Forgot Password?")
  const [errorMsg, setError] = useState("Invalid email or password")


  const onSubmit = (e) => {
    e.preventDefault()
    clearLoginError();
    login({email,password})
  }

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }
    
  const forgotPassword = (e) => {
    e.preventDefault();
    setForgot(`Password reset instructions sent to ${email}`)
  }

  return (
    <div className="App">
      <div className="card p-30 m-30">
        <form onSubmit={e=>onSubmit(e)} style={{width:'70%', margin:'auto', padding:'20px'}}>
          <h1 style={{width:'70%', margin:'auto', padding:'20px'}} className="grey-text">Login</h1>
          <div className='container'>
            <div className='field'>
              <input 
                type="email" 
                id="email" 
                required 
                onChange={e=> setEmail(e.target.value)}
                className="form-input"
                placeholder="Email"
              />
            </div>
            <div className='field'>
              <input
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                name="password"
                required
              />
            </div>
            <div>
              <button style={{width:'250px', margin:'30px 0'}} className={validateForm() ? "btn btn-block" : "disabledBtn"} disabled={!validateForm()}>LOGIN</button>
            </div>
            {
              error && <p style={{fontSize:'20px'}} className='forgot-password-red red-text'>{errorMsg}</p>
            }
            { email.length > 0 &&
              <p className={forgot === "Forgot Password?" ? 'forgot-password': 'forgot-password-red red-text'} onClick={e => forgotPassword(e)} id='forgot-password'>{forgot}</p>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    login: (credentials) => dispatch(login(credentials)),
    clearLoginError: () => dispatch(clearLoginError())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
