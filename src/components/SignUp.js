import React, { useState } from 'react'
import { useContext } from 'react'
import authContext from "../contexts/auth/authContext"
import { Link } from 'react-router-dom'

const SignUp = () => {
    const context = useContext(authContext);
    const {signup} = context;
    const [signup_data, setLogin] = useState({name:"",email:"",password: ""})
    const handleSubmit = (e)=>{
        e.preventDefault();
        let res = signup(signup_data.name, signup_data.email, signup_data.password);
        setLogin({name:"",email:"",password: ""});
    }
    const changeHandler = (e) => {
        setLogin({ ...signup_data, [e.target.name]: e.target.value });
    }
    return (
        <div className='container' style={{ height: '700px', alignItems: 'center', display: 'flex' }}>
            <div className='container-sm readability' style={{ maxWidth: '500px', padding: '30px' }}>
                <h2 className='d-flex justify-content-center'>Sign Up!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name = "name" onChange={changeHandler}/>
                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" name = "email" onChange={changeHandler} aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name = "password" onChange={changeHandler}/>
                    </div>
                    <div className="d-flex justify-content-center align-items-center my-4" style={{ padding: '10px' }}>
                        <button type="submit" className="btn btn-outline-light my-2 my-sm-0 mx-2">Sumit!</button>
                    </div>
                    <div className="d-flex justify-content-end align-items-center" style={{ height: '30px' }}>
                        <p style={{ fontSize: 'small' }}>Already have an account? <Link to='/login' type="submit" className="btn btn-outline-light btn-sm my-2 my-sm-0" style={{ fontSize: 'small' }}>Login!</Link></p><br />
                    </div>
                    <div className="d-flex justify-content-end align-items-center" style={{ height: '30px' }}>
                        <Link to='/' type="submit" className="btn btn-outline-light btn-sm my-sm-0" style={{ fontSize: 'small' }}>Home</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SignUp
