import React from "react";
import HomeLeft from "../components/HomeLeft";
import HomeMid from "../components/HomeMid";
import Banner from "../components/Banner";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <div container
    className="homebody">
      <div className="homebanner">
        <Banner />
      </div>
      <Grid container className="homemaincontainer">
        <Grid item sx={12} md={2} className="homemain-contentleft">
          <HomeLeft />
        </Grid>
        <Grid item sx={12} md={6} 
          className="homemain-contentmid"
          style={{width: "100%", maxWidth: "32.5rem"}}
        >
          <HomeMid />
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;
