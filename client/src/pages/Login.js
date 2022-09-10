import React, { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import {login} from "../redux/actions/authActions";
import {useDispatch} from "react-redux";

const Login = () => {
  const initialState = {email: '', password: ''}
 
  const [showpass, setShowpass] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();
const {email, password} = userData;
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({...userData , [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData))
  };

  return (
    <div className="login">
      <div className="login-container">
        <h3 className="login-header">Social network</h3>
        <h6 className="login-subheader">Login</h6>

        <form className="login-dataform" onSubmit={handleSubmit}>
          <input
            className="data-formemail"
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="type your email"
          />
          <input
            className="login-dataformpass"
            type={showpass ? "type" : "password"}
            placeholder="type your password"
            value={password}
            name="password"
            onChange={handleChange}
          />

          <small
            className="login-showpass"
            onClick={() => setShowpass(!showpass)}
          >
            {showpass ? "Hide" : "show"}{" "}
          </small>

          <button className="login-dataformbtn" type="submit">
            Log In
          </button>
          <p className="login-small">
            Do not have account <Link to="/register">Create HERE</Link>
          </p>
        </form>
      </div>
     
    </div>
  );
};

export default Login;
