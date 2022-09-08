import React, { useState } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showcfpass, setShowcfpass] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const[gender, setGender]= useState('male')

  return (
    <div className="register">
      <div className="register-container">
        <h3 className="register-header">Social network</h3>
        <h6 className="register-subheader">REGISTER</h6>

        <form className="register-dataform">
          <input
            className="data-formemail"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="type your fullname"
          />

          <input
            className="data-formemail"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="type your username"
          />

          <input
            className="register-dataformpass"
            type="email"
            placeholder="type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="register-dataformpass"
            type={showcfpass ? "hide" : "password"}
            placeholder="type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small
            className="register-showcfpass"
            onClick={() => setShowcfpass(!showcfpass)}
          >
            {showcfpass ? "Hide" : "show"}{" "}
          </small>
          <input
            className="register-dataformpass"
            type={showpass ? "type" : "password"}
            placeholder="type your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <select className="register-dataformselect" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <small
            className="register-showpass"
            onClick={() => setShowpass(!showpass)}
          >
            {showpass ? "Hide" : "show"}{" "}
          </small>
          <button className="register-dataformbtn" type="submit">
            Log In
          </button>
          <p className="register-small">
            Already have an account <Link to="/">LogIn HERE</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
