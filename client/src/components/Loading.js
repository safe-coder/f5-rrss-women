import React from "react";
import Load from "../images/loading.gif"

const Loading = () => {
  return (
  <div style={{position: "fixed",
  height: "100%",
  width: "100%",
  zIndex: "50",
  backgroundColor: "rgba(36, 0, 70, 0.8)",
  top: "0",
  left: "0"}}>
  <img src={Load} alt="" width="300rem" style={{
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  dropShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
}}/>
  </div>
  );
};

export default Loading;
