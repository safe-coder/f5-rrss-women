import React from "react";
import "../styles/Register.css";
import Register from "../components/Register";
import UserList from "../components/UserList";

const Admin = () => {
  return (
    <div className="admin-container">
      <UserList/>
      <Register/>
    </div>
  );
};

export default Admin;