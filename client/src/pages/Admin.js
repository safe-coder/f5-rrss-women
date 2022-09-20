import React from "react";
import Register from "../components/Register";
import UserList from "../components/UserList";
import {useSelector} from "react-redux"

const Admin = () => {
  const {usersList} = useSelector(state=>state)
  console.log(usersList)
  return (
    <div className="admin-container" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <UserList/>
      <Register/>
    </div>
  );
};

export default Admin;