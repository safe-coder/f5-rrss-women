import React, { useEffect, useState } from "react";
import "../../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {register} from '../../redux/actions/authActions';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const initialState = { username:'', fullname:'', email:'', password:'', confirmPassword:'',role:'user'}
 
  const [showcfpass, setShowcfpass] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [userData, setuserData] = useState(initialState);
  const { username, fullname, email, password, confirmPassword, role } = userData;

  const { auth,alert } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value })
  }
  
//   useEffect(() => {
//     if (auth.token) {
//       navigate('/');
//     }
//   }, [auth.token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (auth.token) {
    //   navigate('/admin');
    // }
    dispatch(register(userData))
   // window.location.reload(false);
  }
  return (
    <div className="register">
      <div className="register-container">
        <h3 className="register-header">Admin</h3>
        <h6 className="register-subheader">REGISTRO</h6>

        <form className="register-dataform" onSubmit={handleSubmit}>
        <select className="register-dataformselect" name="role" value={role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        
      </select>
          <input
            className="register-dataformpass"
            type="text"
            value={fullname}
            name="fullname"
            onChange={handleChange}
            placeholder={alert.fullname ? `${alert.fullname}` : 'Nombre completo'}
            style={{background:`${alert.fullname ? '#fa8e96' : ''}`}}
          />
         
          <input
            className="register-dataformpass"
            type="text"
            name="username"
            value={username.toLowerCase().replace(/ /g,'')}
            onChange={handleChange}
            placeholder={alert.username ? `${alert.username}` : 'Nombre de usuaria'}
            style={{background:`${alert.username ? '#fa8e96' : ''}`}}
          />
       
          <input
            className="register-dataformpass"
            type="email"
            placeholder={alert.email ? `${alert.email}` : 'Email'}
            value={email}
            name="email"
            onChange={handleChange}
            style={{background:`${alert.email ? '#fa8e96' : ''}`}}
          />
         <div className="register-showpass">
          <input
            className="register-dataformpass"
            type={showcfpass ? "hide" : "password"}
            placeholder={alert.password ? `${alert.password}` : 'Contraseña'}
            value={password}
            name="password"
            onChange={handleChange}
            style={{background:`${alert.password ? '#fa8e96' : ''}`}}
          />
        
          <small
            className="register-showcfpass"
            onClick={() => setShowcfpass(!showcfpass)}
          >
            {showcfpass ?  <RemoveRedEyeIcon/> : <VisibilityOffIcon/>}
          </small>
</div>
<div className="register-showpass">
          <input
            className="register-dataformpass"
           type={showpass ? "type" : "password"}
            placeholder={alert.confirmPassword ? `${alert.confirmPassword}` : 'Repite tu contraseña'}
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            style={{background:`${alert.confirmPassword ? '#fa8e96' : ''}`}}
          />
          <small
           
            onClick={() => setShowpass(!showpass)}
          >
            {showpass ? <RemoveRedEyeIcon/> : <VisibilityOffIcon/>}
          </small>
</div>
          <button className="register-dataformbtn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;