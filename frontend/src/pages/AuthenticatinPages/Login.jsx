import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendRequest } from "../../request";
import {useNavigate} from 'react-router-dom';

import "./auth.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {
    const response = await sendRequest({
      method: "POST",
      body: {
        email,
        password,
      },
      route: "auth/login",
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.type);


    if(response.data.type === "user"){
      navigate('../user')
    }

    if(response.data.type === "admin"){
      navigate('../admin')
    }
    
  };
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Email</label>
        <input
          type="email"
          placeholder=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <input type="button" value="Login" onClick={handleLogin} />
          Don't Have An Account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
