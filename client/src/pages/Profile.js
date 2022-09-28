import React from "react";
import Info from "../components/Info";
import HomeMid from "../components/HomeMid";
import About from "../components/About";
import "../styles/Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../redux/actions/profileActions";
import { getPost } from "../redux/actions/postActions";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Friends from "../components/Friends";
import Following from "../components/Following";
import { Grid } from "@mui/material";
// import SingleUserPosts from "../components/SingleUserPosts";
// import SavedPost from "../components/SavedPost";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  //console.log(userData);
  const [homePostData, setHomePostData] = useState([]);
  console.log(userData);
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
    //   console.log(newData)
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
          {/* <IconButton onClick={()=>handletoggle('showsaved')}>
                        <BookmarksIcon/>
                  </IconButton> */}
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
          {/* <Grid item sm={1} xs={0} md={0} lg={0.5}>
          </Grid> */}

          {/* <Grid item sm={10} xs={6} md={5} lg={3.5}className="profilebody-left"> */}
          <div className="profilebody-left">
            <About userData={userData} profile={profile} auth={auth} id={id} />
            </div>
          {/* </Grid> */}

          {/* <Grid item sm={1} xs={0} md={0} lg={0.5}>
          </Grid> */}

          {/* <Grid item sm={12} xs={12} md={5} lg={3}className="profilebody-center"> */}
          <div className="profilebody-center">
            <HomeMid homePost={homePostData} />
            </div>
          {/* </Grid> */}

<div className="profilebody-right">
</div>
          {/* <Grid item sm={0} xs={0} md={2} lg={3}className="profilebody-right">
          </Grid>

          <Grid item sm={0} xs={0} md={1} lg={1.5}>
          </Grid> */}

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
      {/* {
    showsaved && <SavedPost auth={auth}  />
} */}
    </div>
  );
};

export default Profile;
