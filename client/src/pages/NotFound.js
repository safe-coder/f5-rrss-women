import React from "react";
import "../styles/NotFound.css";
import { Link } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import image from "../images/user-avatar.png"

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound-content">
        <div className="notfound-top">
          <CircleIcon className="notfound-icon"/>
          </div>
          <div className="notfound-body">
      <h3 className="notfound-text">¡Ups! Esta página no existe</h3>
      <img className="notfound-img" src={image} alt=""/>
      <Link to="/">
        <button className="notfound-link ">Volver a la página principal</button>
      </Link>
      </div>
      </div>
    </div>
  );
};

export default NotFound;
