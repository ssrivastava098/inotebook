import React, {useEffect} from 'react'
import { Link, useLocation} from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    useEffect(()=>{
        console.log(location.pathname);
    },[location]);
    return (
        <><nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <nav className="navbar navbar-expand-lg bg-body-tertiaryc">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active':''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
                            </li>
                        </ul>
                        
                        
                    </div>
                    
                </div>
            </nav>
            <div className="d-flex" style={{align:'right'}}>
                <Link to='/login' className="btn btn-outline-light my-2 my-sm-0 mx-2" type="submit">Login</Link>
                <Link to='/signup' className="btn btn-outline-light my-2 my-sm-0 mx-2" type="submit">Sign Up</Link>
            </div>
        </nav>

        </>
    )
}

export default Navbar
