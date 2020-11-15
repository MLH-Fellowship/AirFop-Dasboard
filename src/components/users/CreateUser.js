import React, { useState } from 'react'
import {createUser} from '../../store/actions/userActions'
import {connect} from 'react-redux'

const CreateUser = ({createUser}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        createUser({email:userName,password,isAdmin});
        setUserName('');
        setPassword('');
        setPassword2('');
        console.log({email:userName,password,isAdmin})
    }

    const validateForm = () => {
        return userName.length > 0 && password.length > 5 && password === password2;
    }
    return (
    <div className="App">
        <div className="card p-30 m-30">
            <form onSubmit={e=>onSubmit(e)} className='new-project'>
                <h1  style={{width:'70%', margin:'auto', padding:'20px'}}className="grey-text">New User</h1>
                <table id="new-project-table" style={{width:'70%', margin:'auto'}} >
                    <tbody>
                        <tr>
                            <td className='tableData'>
                                <input 
                                    type="email" 
                                    id="userName" 
                                    required 
                                    onChange={e=> setUserName(e.target.value)}
                                    className="form-input"
                                    placeholder="Email"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className='tableData'>
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
                            </td>
                        </tr>
                        <tr>
                            <td className='tableData'>
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
                            </td>
                        </tr>
                        <tr>
                            <td className='tableData'>
                            <div style={{padding:'12px 0'}}>
                            <label>
                                <input
                                    type="checkbox"
                                    id='isAdmin'
                                    checked={isAdmin}
                                    onChange={()=>setIsAdmin(!isAdmin)}
                                    // className="form-check-input"
                                />
                                {" "}Admin
                            </label>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="input-field" style={{width:'70%', margin:'30px auto'}}>
                <button style={{width:'250px'}} className={validateForm() ? "btn-block" : "disabledBtn"} disabled={!validateForm()}>Create</button>
                </div>
            </form>
        </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return{
    createUser: (user) => dispatch(createUser(user))
  }
}
export default connect(null, mapDispatchToProps)(CreateUser);


 // <div className="App m-30">
        //     <div className="card p-30 m-30">
        //     <form onSubmit={e=>onSubmit(e)} className='form'>
        //     <div className="input-field">
        //         <h1 className="grey-text">New User</h1>
        //         <input 
        //             type="email" 
        //             id="userName" 
        //             required 
        //             onChange={e=> setUserName(e.target.value)}
        //             className="input"
        //             placeholder="Email"
        //         />
        //         <input
        //             className="input"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             placeholder="Password"
        //             type="password"
        //             name="password"
        //             minLength="6"
        //             required
        //         />
        //         <input
        //             className="input"
        //             value={password2}
        //             onChange={(e) => setPassword2(e.target.value)}
        //             placeholder="Confirm password"
        //             type="password"
        //             name="password2"
        //             minLength="6"
        //             required
        //         />
        //         <div style={{margin:'20px 0'}}>
        //         <label>
        //             <input
        //                 type="checkbox"
        //                 id='isAdmin'
        //                 checked={isAdmin}
        //                 onChange={()=>setIsAdmin(!isAdmin)}
        //                 className="form-check-input"
        //             />
        //             {" "}Admin
        //         </label>
        //         </div>
        //     </div>
        //     <div className="input-field" style={{width:'350px'}}>
        //         <button className={validateForm() ? "btn-block" : "disabledBtn"} disabled={!validateForm()}>Create</button>
        //     </div>
        //     </form>
        //     </div> 
        // </div>
