import React, { useState } from "react";
import "../../styles/GlobalCard.css";
import CircleIcon from "@mui/icons-material/Circle";
import { useSelector } from "react-redux";
import GlobalFriendBtn from "../profile/GlobalFriendBtn";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const GlobalCard = ({ user }, { posts }) => {
  const [showinfo, setshowinfo] = useState(true);
  const [showinfoabout, setshowinfoabout] = useState(false);
  const { auth } = useSelector((state) => state);

  const toggleshowinfo = (sinfo) => {
    if (sinfo === "showinfo") {
      setshowinfo(true);
      setshowinfoabout(false);
    } else if (sinfo === "showinfoabout") {
      setshowinfo(false);
      setshowinfoabout(true);
    }
  };

  return (
    <Grid item className="globalcard" style={{ margin: "1rem" }}>
      <div className="globalcard-uitop">
        <h6>@{user.username}</h6>
        <CircleIcon fontSize="small" className="closebtn" />
      </div>
      <div className="globalcard-content">
        <div className="globalcard-contenttop">
          <img src={user.banner} alt="" />
        </div>
        <div className="globalcard-contentmiddle">
          <img src={user.avatar} alt="" />
        </div>
        <Link to={`/profile/${user._id}`}>
          <div className="globalcard-contentmiddleinfo">
            <h4>{user.fullname}</h4>
          </div>
        </Link>
        {showinfo && (
          <>
            <div className="globalcard-contentbottom">
              <div className="globalcard-contentbottomstat">
                <h6>{user.friends.length}</h6>
                <p>Seguidoras</p>
              </div>
              <div className="globalcard-contentbottomstat">
                <h6>{user.following.length}</h6>
                <p>Siguiendo</p>
              </div>
            </div>

            {auth.user._id !== user._id && (
              <GlobalFriendBtn
                classbtn="globalcard-contentbottombtn"
                user={user}
              />
            )}
          </>
        )}
        {showinfoabout && (
          <div className="globalcard-contentbottomabout">
            <p className="globalcard-contentbottomabout-story">{user.story}</p>
            <h4 className="globalcard-contentbottomabout-email">
              {user.email}
            </h4>
            <h4 className="globalcard-contentbottomabout-website">
              {user.website}
            </h4>
          </div>
        )}
        <div className="globalcard-contentbottomnavigate">
          <span onClick={() => toggleshowinfo("showinfo")}>
            {" "}
            <NavigateBeforeIcon />{" "}
          </span>
          <span onClick={() => toggleshowinfo("showinfoabout")}>
            {" "}
            <NavigateNextIcon />{" "}
          </span>
        </div>
      </div>
    </Grid>
  );
};

export default GlobalCard;
