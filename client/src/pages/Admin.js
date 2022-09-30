import React from "react";
import Register from "../components/admin/Register";
import UserList from "../components/admin/UserList";
import {useSelector} from "react-redux"
import { Grid } from "@mui/material";

const Admin = () => {
  const {usersList} = useSelector(state=>state)
  console.log(usersList)
  return (
    <div style={{width: "100vw", display: "flex", alignItems: "center"}}>
    <Grid container className="admin-container">
    <Grid item md={0.5} sm={0} xs={0} lg={2}>
      </Grid>
      <Grid item md={6} sm={12} xs={12} lg={4} style={{marginTop:"5rem"}}>
      <UserList/>
      </Grid>
      <Grid item md={0.5} sm={4} xs={1} lg={1}>
      </Grid>
      <Grid item md={2} sm={8} xs={11} lg={2} style={{marginTop:"5rem"}}>
      <Register/>
      </Grid>
      <Grid item md={2} xs={0} lg={2}>
      </Grid>
    </Grid>
    </div>
  );
};

export default Admin;