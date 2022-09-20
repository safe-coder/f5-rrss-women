import React from "react";
import { useSelector } from "react-redux";
import blob from "../images/blob.svg"

const Banner = () => {
  const { auth } = useSelector((state) => state);
  return (
    // <></>
    <div
      style={{
        height: "250px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        margin: "auto",
        borderRadius: "20px",
        position: "relative",
        marginBottom: "5rem"
      }}
    >
      <div
        style={{
          backgroundImage: `url(${blob})`,
          backgroundPosition: 'center',
          backgroundSize: 'auto',
          backgroundRepeat: 'no-repeat',
          // backgroundColor: "#fad0c4",
          // background:
          //   "linear-gradient(315deg, rgba(150, 25, 135, 0.288), rgba(241, 167, 241, 0.288))",
          height: "350px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <h3 style={{backgroundColor: "#EEDAFF", marginBottom: "1rem"}}>¡Bienvenida a Fem 5!</h3>
        <h2><span style={{backgroundColor: "#EEDAFF"}}>La red social para coders</span><br/>
        <span style={{backgroundColor: "#EEDAFF"}}>de <span style={{color: "#ff6d00"}}>Factoría F5</span></span></h2>
      </div>
    </div>
  );
};

export default Banner;
