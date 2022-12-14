import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { getDataApi } from "../utils/fetchDataApi";
import UserCard from "./profile/UserCard";
import LoadIcon from "../images/loading.gif";
import LogoSC from "../images/LOGOSC.png";

export const Header = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { pathname } = useNavigate();
  const [load, setLoad] = useState(false);

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataApi(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

  return (
    <div className="header">
      <Link to="/" className="linkhome">
        <IconButton>
          <HomeIcon
            fontSize="large"
            className={`${isActive("/")}`}
            style={{ color: "#FF9E00" }}
          />
        </IconButton>
      </Link>
      <div className="header-right">
        <Link to="/">
          <img
            src={LogoSC}
            width="250rem"
            alt=""
            style={{ paddingLeft: "1.3rem" }}
          />
        </Link>
      </div>
      <form className="header-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar perfiles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="header-centericons">
          <span
            className="header-centersearchclose"
            onClick={handleClose}
            style={{ opacity: users.length > 0 ? "1" : "0" }}
          >
            <CancelIcon
              fontSize="large"
              style={{ color: "#240046", cursor: "pointer" }}
            />
          </span>
          <SearchIcon
            style={{ color: "#240046", opacity: users.length > 0 ? "0" : "1" }}
            fontSize="large"
          />
        </div>
        <div className="header-searchusers">
          {load && (
            <img
              src={LoadIcon}
              alt=""
              style={{ width: "48px", height: "48px" }}
            />
          )}
          {search &&
            users.length > 0 &&
            users.map((user) => (
              <Link to={`profile/${user._id}`} key={user}>
                <UserCard user={user} key={user} handleClose={handleClose} />
              </Link>
            ))}
        </div>
      </form>

      <div className="header-left">
        <Link to={`profile/${auth.user._id}`}>
          <div className="header-leftAvatar">
            <Avatar src={auth.user.avatar} />
            <h4
              style={{
                color: "#FF9E00",
                paddingLeft: ".8rem",
                paddingRight: ".8rem",
              }}
            >
              {auth.user.fullname}
            </h4>
          </div>
        </Link>

        <div className="header-leftIcons">
          <IconButton
            onClick={() => dispatch(logout())}
            style={{ color: "#FF9E00" }}
          >
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
