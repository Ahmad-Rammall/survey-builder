import React, { useState } from "react";
import { sendRequest } from "../../request";
import { Link } from "react-router-dom";
import Login from "./Login";
import "./auth.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [type, setType] = useState("");

  const handleRegister = async () => {
    const response = await sendRequest({
      method: "POST",
      body: {
        email,
        password,
        firstName: fname,
        lastName: lname,
        user_type: type,
      },
      route: "auth/register",
    });
    console.log(response);
  };
  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>First Name</label>
        <input
          type="text"
          placeholder=""
          onChange={(e) => setFname(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          placeholder=""
          onChange={(e) => setLname(e.target.value)}
        />
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
        <div className="type">
          <label>Account Type : </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="admin"
              onChange={(e) => setType(e.target.value)}
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="user"
              onChange={(e) => setType(e.target.value)}
            />
            User
          </label>
        </div>

        <input type="button" value="Register" onClick={handleRegister} />
        <div>
          Already Have An Account? <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
