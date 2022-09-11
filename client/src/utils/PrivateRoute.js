import React from 'react'
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ props, children }) => {
const login = localStorage.getItem('login')
  return  login ?  {...props, ...children}  : <Navigate   to="/>" /> 
  }

export default PrivateRoute;