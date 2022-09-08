import React, { useState } from "react";
import '../styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [showpass, setShowpass] = useState(false)

  return (
    <div className="login">
      <div className="login-container">
      <h3 className="login-header">Social network</h3>
      <h6 className="login-subheader">Login</h6>
      
        <form className="login-dataform" >
          <input
            className="data-formemail"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="type your email" />
          <input
            className="login-dataformpass"
            type={showpass ? "type" : "password"}
            placeholder="type your password"
           value={password}
            onChange={(e) => setPassword(e.target.value)} />
          
          <small className="login-showpass" onClick={()=> setShowpass(!showpass) }>{showpass ? "Hide" : "show"} </small>

          <button
          className="login-dataformbtn"
            type="submit">Log In</button>
          <p className="login-small">Do not have account <Link to="/register" >Create HERE</Link> </p>
        </form>
        </div>
    </div>
  );
};

export default Login;
