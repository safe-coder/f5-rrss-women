import React from "react";
import { Link } from "react-router-dom";

const PanelAdminBtn = ({ classbtn, user }) => {
  return (
    <>
      <Link to="/admin" style={{ position: "absolute", height: "50px" }}>
        <button className="profileinfo-centersecondbutton">Panel Admin</button>
      </Link>
    </>
  );
};

export default PanelAdminBtn;
