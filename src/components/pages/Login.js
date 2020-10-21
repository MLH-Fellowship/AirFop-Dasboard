import React, { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    console.log('on submit')
  }
  // const onChange = () => {
  //   console.log('on change')
  // }
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }
    
  return (
    <div className="login">
      <form onSubmit={onSubmit} className='card'>
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

export default Login
