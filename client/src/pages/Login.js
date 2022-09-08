import React, { useState } from "react";
import '../styles/Login.css';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

            onChange={(e)=>setEmail(e.target.email)}
            placeholder="type your email" />
          <input
            className="login-dataformpass"
            type="password"
            placeholder="type your password"
           value={password}
           onChange={(e)=>setPassword(e.target.password)}/>
          <button
          className="login-dataformbtn"
            type="submit">Log In</button>
        </form>
        </div>
    </div>
  );
};

export default Login;
