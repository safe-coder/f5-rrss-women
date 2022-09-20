import React from "react";
import HomeLeft from "../components/HomeLeft";
//import HomeMid from "../components/HomeMid";
import Banner from "../components/Banner";

import Status from "../components/Status";

const Home = () => {
  return (
    <div container
    className="homebody" style={{    display: "grid",
      placeItems: "center"}}>
      <div className="homebanner">
        <Banner />
      </div>
      <div className="homemaincontainer">
        <div className="homemain-contentleft">
          <HomeLeft />
        </div>
        <div
          className="homemain-contentmid"
        >
          <Status/>
          {/* <HomeMid /> */}
        </div>
        {/* <div className="homemain-contentright">
                    <HomeRight/>
                </div> */}
      </div>
    </div>
  );
};
export default Home;
