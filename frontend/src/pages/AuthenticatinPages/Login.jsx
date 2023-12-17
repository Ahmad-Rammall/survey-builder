import React, {useState} from "react";
import { Link } from "react-router-dom";
import { sendRequest } from "../../request";

import './auth.css'
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await sendRequest({
      method: "POST",
      body: {
        email,
        password,
      },
      route: "auth/login",
    });
    console.log(response.data.token);
    localStorage.setItem('token', response.data.token)
  };
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Email</label>
        <input type="email" placeholder="" onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input type="password" placeholder="" onChange={(e) => setPassword(e.target.value)}/>
        <input type="button" value="Login" onClick={handleLogin}/>
        <div>
          Don't Have An Account? <Link to='/register'>Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
