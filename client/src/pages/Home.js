import React from "react";
import HomeLeft from "../components/home/HomeLeft";
import Banner from "../components/home/Banner";
import { Grid } from "@mui/material";
import PostMid from "../components/home/PostMid";
import "../styles/Home.css";

const Home = () => {
  return (
    <div container className="homebody">
      <div className="homebanner">
        <Banner />
      </div>
      <Grid
        container
        className="homemaincontainer"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start",
          className: "profilebody",
        }}
      >
        <div className="homemain-contentleft">
          <HomeLeft />
        </div>
        <div className="homemain-contentmid">
          <PostMid />
        </div>
        <div className="homemain-contentright"></div>
      </Grid>
    </div>
  );
};
export default Home;
