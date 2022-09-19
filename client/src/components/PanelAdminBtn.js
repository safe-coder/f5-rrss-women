import React from "react";
import { Link } from "react-router-dom";
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

const PanelAdminBtn = () => {
  return (
    <>
      <Link to="/admin" style={{ position: "absolute", height: "50px" }}>
        <button className="profileinfo-centersecondbutton"><EnhancedEncryptionIcon fontSize="large"/></button>
      </Link>
    </>
  );
};

export default PanelAdminBtn;
