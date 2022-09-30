import React from "react";
import HomeLeft from "../components/HomeLeft";
//import HomeMid from "../components/HomeMid";
import Banner from "../components/Banner";
import { Grid } from "@mui/material";
//import Status from "../components/Status";
import PostAll from "../components/PostAll";
import PostMid from "../components/PostMid";
import "../styles/Home.css"

const Home = () => {
  return (
    <div container
    className="homebody">
      <div className="homebanner">
        <Banner />
      </div>
      <Grid container className="homemaincontainer" style={{display: "flex", flexDirection:"row",
            justifyContent:"space-around",
            alignItems:"flex-start",
            className:"profilebody"}}>
        {/* <Grid item sx={12} md={3} className="homemain-contentleft" style={{paddingLeft: "5%"}}> */}
        <div className="homemain-contentleft">
          <HomeLeft />
          </div>
        {/* </Grid> */}

        {/* <Grid item sx={12} md={6} 
          className="homemain-contentmid"
          style={{width: "100%", maxWidth: "32.5rem"}}
        > */}
        <div className="homemain-contentmid">
          <PostMid/>
</div>
        {/* </Grid> */}
        {/* <Grid item md={3}  className="homemain-contentright">
                </Grid> */}
                <div className="homemain-contentright">
                </div>
      </Grid>
    </div>
  );
};
export default Home;
