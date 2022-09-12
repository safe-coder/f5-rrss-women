import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import "../styles/ProfileInfo.css"
import Profile from "../pages/Profile";
import {getProfileUsers} from "../redux/actions/profileActions"

const Info = () => {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth && auth.user && id === auth.user._id){
        setUserData([auth.user])
    }else{
      dispatch(getProfileUsers({users: profile.users, id, auth}))
      const newData = profile.users.filter(user=>user._id === id)
      setUserData(newData)
    }
  }, [id, auth.user, auth]);


  return (
    <div className="profileinfo">
    {userData.length > 0 && userData.map((user=>(
      <div className="profileinfo-container" key={user._id}>
        <div className="profileinfo-top">
          <img src={user.avatar} alt=""/>
        </div>
        <div className="profileinfo-center">
          <img className="profileinfo-centeravatar" src={user.avatar} alt=""/>
          <button className="profileinfo-centerbutton">ADD FRIEND</button>
        </div>
        <div className="profileinfo-bottom">
                    <div className="profileinfo-bottomleft">
                    <div className="profileinfo-stat">
                        <h6 className="profileinfo-statnumber">{user.friends.length}</h6>
                        <h6 className="profileinfo-statdesc">FRIENDS</h6>
                    </div>
                    <div className="profileinfo-stat">
                        <h6 className="profileinfo-statnumber">{user.following.length}</h6>
                        <h6 className="profileinfo-statdesc">FOLLOWING</h6>
                    </div>
                    </div>
                    <div className="profileinfo-bottomcenter">
                        <h3 className="profileinfo-fullname">{user.fullname}</h3>
                        <h5 className="profileinfo-username">{user.username}</h5>
                    </div>
                    <div className="profileinfo-bottomright">
                      <div className="profileinfo-stat">
                        <h6 className="profileinfo-statnumber">{user.friends.length}</h6>
                        <h6 className="profileinfo-statdesc">POST</h6>
                        </div>
                    </div>
                    </div>
        </div>
    )))}
    </div>
  )
};

export default Info;
