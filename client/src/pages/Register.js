import React, { useEffect, useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {register} from '../redux/actions/authActions'


const Register = () => {
  const initialState = { username:'', fullname:'', email:'', password:'', confirmPassword:'', gender:'male'}
 
  const [showcfpass, setShowcfpass] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [userData, setuserData] = useState(initialState);
  const { username, fullname, email, password, confirmPassword, gender } = userData;

  const { auth,alert } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value })

  }
  
  useEffect(() => {
    if (auth.token) {
      navigate('/')
    }
  }, [auth.token, navigate])


  const handleSubmit = (e) => {
    e.preventDefault();
  
    dispatch(register(userData))
  }
  return (
    <div className="register">
      <div className="register-container">
        <h3 className="register-header">Social network</h3>
        <h6 className="register-subheader">REGISTER</h6>

        <form className="register-dataform" onSubmit={handleSubmit}>
          <input
            className="data-formemail"
            type="text"
            value={fullname}
            name="fullname"
            onChange={handleChange}
            placeholder={alert.fullname ? `${alert.fullname}` : 'enter your fullname'}
            style={{background:`${alert.fullname ? '#fa8e96' : ''}`}}
          />
         
          <input
            className="data-formemail"
            type="text"
            name="username"
            value={username.toLowerCase().replace(/ /g,'')}
            onChange={handleChange}
            placeholder={alert.username ? `${alert.username}` : 'enter your username'}
            style={{background:`${alert.username ? '#fa8e96' : ''}`}}
          />
       
          <input
            className="register-dataformpass"
            type="email"
            placeholder={alert.email ? `${alert.email}` : 'enter your email'}
            value={email}
            name="email"
            onChange={handleChange}
            style={{background:`${alert.email ? '#fa8e96' : ''}`}}
          />
          
          <input
            className="register-dataformpass"
            type={showcfpass ? "hide" : "password"}
            placeholder={alert.password ? `${alert.password}` : 'enter your password'}
            value={password}
            name="password"
            onChange={handleChange}
            style={{background:`${alert.password ? '#fa8e96' : ''}`}}
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
            placeholder={alert.confirmPassword ? `${alert.confirmPassword}` : 'enter you password again'}
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            style={{background:`${alert.confirmPassword ? '#fa8e96' : ''}`}}
          />
           
          <select className="register-dataformselect"
            name="gender"
            value={gender} onChange={handleChange}>
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
