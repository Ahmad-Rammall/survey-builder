import React, { useState } from "react";
import { sendRequest } from "../../requestWithImage";
import { Link } from "react-router-dom";
import Login from "./Login";
import "./auth.css";
import { useEffect } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", fname);
    formData.append("lastName", lname);
    formData.append("user_type", type);
    formData.append("image", image);

    const response = await sendRequest({
      method: "POST",
      body: formData,
      route: "auth/register",
    });
    console.log(response);
  };


  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>Profile Picture</label>
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          placeholder=""
          onChange={(e) => console.log(e.target.files[0])}
        />
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
          Already Have An Account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
