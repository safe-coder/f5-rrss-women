import React from "react";
import Register from "../components/Register";
import UserList from "../components/UserList";

const Admin = () => {
  return (
    <div className="admin-container" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <UserList/>
      <Register/>
    </div>
  );
};

export default Admin;