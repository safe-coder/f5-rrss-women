import React from "react";
import {Route, Navigate} from "react-router-dom"

const PrivateRouter = ({props, children}) =>{
    const login = localStorage.getItem('login')
    return login ? <Route {...props}>{children}</Route> : <Navigate to="/"></Navigate>
}

export default PrivateRouter;