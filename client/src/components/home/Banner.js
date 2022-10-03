import React from "react";
import { useSelector } from "react-redux";
import banner from "../../images/banner.png";
import { Grid } from "@mui/material";

const Banner = () => {
  const { auth } = useSelector((state) => state);
  return (
    <Grid
      container
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "auto",
        margin: "auto",
        marginTop: "3%",
        marginBottom: "3%",
        borderRadius: "20px",
        position: "relative",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Grid item className="banner-left" style={{ textAlign: "center" }}>
        <h2
          style={{
            backgroundColor: "#EEDAFF",
            marginBottom: "1rem",
            fontSize: "4rem",
          }}
        >
          ¡Bienvenida a <span style={{ color: "#ff6d00" }}>Fem-5</span>!
        </h2>
        <h3 style={{ fontSize: "2rem" }}>
          <span style={{ backgroundColor: "#EEDAFF" }}>
            La red social para coders
          </span>
          <br />
          <span style={{ backgroundColor: "#EEDAFF" }}>
            de <span style={{ color: "#ff6d00" }}>Factoría F5</span>
          </span>
        </h3>
      </Grid>
      <Grid item>
        <img src={banner} alt="" style={{ width: "28rem" }} />
      </Grid>
    </Grid>
  );
};

export default Banner;
