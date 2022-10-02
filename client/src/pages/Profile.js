import React from "react";
import Info from "../components/profile/Info";
import HomeMid from "../components/profile/HomeMid";
import About from "../components/profile/About";
import "../styles/Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../redux/actions/profileActions";
import { getPost } from "../redux/actions/postActions";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import Friends from "../components/profile/Friends";
import Following from "../components/profile/Following";
import { Grid } from "@mui/material";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [homePostData, setHomePostData] = useState([]);
  const { id } = useParams();
  const { auth, profile, homePost } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showaccount, setshowaccount] = useState(true);
  const [showfriends, setshowfriends] = useState(false);
  const [showfollowing, setshowfollowing] = useState(false);
  const [showsaved, setshowsaved] = useState(false);

  const handletoggle = (ht) => {
    if (ht === "showaccount") {
      setshowsaved(false);
      setshowfriends(false);
      setshowfollowing(false);
      setshowaccount(true);
    } else if (ht === "showfriends") {
      setshowsaved(false);
      setshowfriends(true);
      setshowfollowing(false);
      setshowaccount(false);
    } else if (ht === "showfollowing") {
      setshowsaved(false);
      setshowfriends(false);
      setshowfollowing(true);
      setshowaccount(false);
    } else if (ht === "showsaved") {
      setshowsaved(true);
      setshowfriends(false);
      setshowfollowing(false);
      setshowaccount(false);
    }
  };

  useEffect(() => {
    if (auth && auth.user && id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, profile.users, dispatch]);

  useEffect(() => {
    const token = auth.token;
    dispatch(getPost({ token, id }));
    const newData = homePost.post;
    setHomePostData(newData);
  }, [id, auth, homePost.post, dispatch]);

  return (
    <div className="profile">
      <Info userData={userData} profile={profile} auth={auth} id={id} />
      <div className="profileheader">
        <div className="profileheader-items">
          <IconButton
            className="profileheader-item"
            onClick={() => handletoggle("showaccount")}
          >
            <HomeIcon />
          </IconButton>
          <IconButton onClick={() => handletoggle("showfriends")}>
            <PeopleIcon />
          </IconButton>
          <IconButton onClick={() => handletoggle("showfollowing")}>
            <PersonAddIcon />
          </IconButton>
        </div>
      </div>
      {showaccount && (
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
          className="profilebody"
        >
          <div className="profilebody-left">
            <About userData={userData} profile={profile} auth={auth} id={id} />
          </div>
          <div className="profilebody-center">
            <HomeMid homePost={homePostData} />
          </div>

          <div className="profilebody-right"></div>
        </Grid>
      )}
      {showfriends && (
        <Friends
          userData={userData}
          dispatch={dispatch}
          profile={profile}
          auth={auth}
          id={id}
        />
      )}
      {showfollowing && (
        <Following
          userData={userData}
          dispatch={dispatch}
          profile={profile}
          auth={auth}
          id={id}
        />
      )}
    </div>
  );
};

export default Profile;
