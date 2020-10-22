import React, { useState } from 'react'
import {login} from '../../store/actions/userActions'
import {connect} from 'react-redux'

const Login = ({login}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault()
    login({email,password})
  }

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }
    
  return (
    <div className="login">
      <form onSubmit={e=>onSubmit(e)} className='card'>
        <div className="input-field">
          <label htmlFor="email">Email{' '}</label>
            <input type="email" id="email" onChange={e=> setEmail(e.target.value)}/>
        </div>
        <div className="input-field">
            <label htmlFor="password">Password{' '}</label>
            <input type="password" id="password" onChange={e=> setPassword(e.target.value)}/>
        </div>
        <div className="input-field">
            <button className={validateForm() ? "btn-block" : "disabledBtn"} disabled={!validateForm()}>Login</button>
        </div>
        <p className="grey-text">Forgot Password?</p>
      </form>
    </div>
  )
    
}

const mapDispatchToProps = (dispatch) => {
  return{
    login: (credentials) => dispatch(login(credentials))
  }
}
export default connect(null,mapDispatchToProps)(Login);
