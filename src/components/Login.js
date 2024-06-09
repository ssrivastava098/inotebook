import React, { useState } from 'react'
import { useContext } from 'react'
import authContext from "../contexts/auth/authContext"
import { Link } from 'react-router-dom'

const Login = () => {
    const context = useContext(authContext);
    const {login} = context;
    const [login_data, setLogin] = useState({email:"",password: ""})
    const handleSubmit = (e)=>{
        e.preventDefault();
        let res = login(login_data.email, login_data.password);
        setLogin({email:"",password: ""});
    }
    const changeHandler = (e) => {
        setLogin({ ...login_data, [e.target.name]: e.target.value });
    }
    return (
        <div className='container' style={{ height: '700px', alignItems:'center', display: 'flex' }}>
            <div className='container-sm readability' style={{ maxWidth: '500px', padding:'30px' }}>
                <h2 className='d-flex justify-content-center'>Login!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" name='email'id="email" value={login_data.email} onChange={changeHandler} aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name='password' value={login_data.password} onChange={changeHandler} id="password" />
                    </div>
                    <div className="d-flex justify-content-center align-items-center my-4" style={{ padding: '10px' }}>
                        <button type="submit" className="btn btn-outline-light my-2 my-sm-0 mx-2" >Submit!</button>
                    </div>
                    <div className="d-flex justify-content-end align-items-center" style={{ height:'30px'}}>
                        <p style={{fontSize: 'small'}}>Don't have an account? <Link to='/signup' type="submit" className="btn btn-outline-light btn-sm my-2 my-sm-0" style={{fontSize: 'small'}}>Sign Up!</Link></p><br/>
                    </div>
                    <div className="d-flex justify-content-end align-items-center" style={{ height:'30px'}}>
                        <Link to='/' type="submit" className="btn btn-outline-light btn-sm my-sm-0" style={{fontSize: 'small'}}>Home</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login