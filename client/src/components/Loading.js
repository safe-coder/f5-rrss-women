import React from "react";
import Load from "../images/loading.gif"

const Loading = () => {
  return (
  //   <div
  //     className="loading"
  //     style={{
        // position: "fixed",
        // height: "100%",
        // width: "100%",
        // textAlign: "center",
        // zIndex: "50",
        // backgroundColor: "#0008",
        // color: "white",
        // top: "0",
        // left: "0",
  //     }}
  //   >
  //     <svg width="400" height="180">
  //       <rect
  //         x="50"
  //         y="20"
  //         width="150"
  //         height="150"
  //         fill="none"
  //         stroke="#fff"
  //         strokeWidth="5"
  //       />
  //       <text
  //         style={{ transform: "translate(45px, -40px" }}
  //         className="loading-text"
  //         fill="#fff"
  //         x="4"
  //         y="147"
  //       >
  //         Loading
  //       </text>
  //     </svg>
  //   </div>
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
