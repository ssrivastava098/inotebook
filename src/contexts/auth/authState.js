import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import authContext from "./authContext";

const AuthState = (props) => {
    const host = "http://localhost:5000";
    const [token, setToken] = useState([]);
    const navigate = useNavigate();
    
    //login
    const login = async (email, password) => {
        let data = {
            email: email,
            password: password
          };
        const response = await fetch(`${host}/app/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const res = await response.json()
        console.log(res);
        if(res.success){
            console.log("hurrray");
            navigate("/");
        }
        else{
            console.log("fucc");
        }
        setToken(res.token);
        return res;
    }

    //Signup
    const signup = async (name, email, password) => {
        let data = {
            name: name,
            email: email,
            password: password
          };
        const response = await fetch(`${host}/app/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const res = await response.json()
        console.log(res);
        if(res.success){
            console.log("hurrray");
            navigate("/login");
        }
        else{
            console.log("fucc");
        }
        setToken(res);
        return res;
    }
    return (
        <authContext.Provider value={{ token , login ,signup }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;
