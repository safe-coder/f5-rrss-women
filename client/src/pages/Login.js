import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const initialState = { email: "", password: "" };
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const [showpass, setShowpass] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  });

  const { email, password } = userData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="login">
      <div className="login-container">
        <h3 className="login-header">Safe Coders</h3>
        <h6 className="login-subheader">Login</h6>

        <form className="login-dataform" onSubmit={handleSubmit}>
          <input
            className="data-formemail"
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
          <div className="login-dataformpass">
          <input
            type={showpass ? "type" : "password"}
            placeholder="Contraseña"
            value={password}
            name="password"
            onChange={handleChange}
          />

          <small
            className="login-showpass"
            onClick={() => setShowpass(!showpass)}
          >
            {showpass ? <RemoveRedEyeIcon/> : <VisibilityOffIcon/> }
          </small>
</div>
          <button className="login-dataformbtn" type="submit">
            Log In
          </button>
          <p className="login-small">
            ¿No tienes cuenta? ¡Escribe a tu contacto de Factoría F5!
          </p>
        </form>
      </div>
     
    </div>
  );
};

export default Login;
