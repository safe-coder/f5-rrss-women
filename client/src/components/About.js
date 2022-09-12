import { listItemSecondaryActionClasses } from "@mui/material";
import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getProfileUsers } from "../redux/actions/profileActions";
import { useEffect, useState } from "react";
import "../styles/ProfileAbout.css"

const About = () =>{

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

    return(
        <div className="profileabout">
            {userData.length > 0 && userData.map(user => (
                <div className="profileabout-container" key={user._id}>
                    <div className="profileabout-contenttop">
                        <h4 className="profileabout-contenttop-head">Sobre Mi:</h4>
                        </div>
                        <div className="profileabout-contentcenter">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            <p className="profileabout-contentcenter-story">{user.story}</p>
                            </div>
                            <div className="profileabout-contentbottom">
                                <div className="profileabout-contentbottominfo">
                                    <h6 className="profileabout-contentbottominfo-head">Unida</h6>
                                    <p className="profileabout-contentbottominfo-body">{user.createdAt}</p>
                                    </div>
                                    <div className="profileabout-contentbottominfo">
                                    <h6 className="profileabout-contentbottominfo-head">Email</h6>
                                    <p className="profileabout-contentbottominfo-body">{user.email}</p>
                                    </div>
                                    <div className="profileabout-contentbottominfo">
                                    <h6 className="profileabout-contentbottominfo-head">Website</h6>
                                    <p className="profileabout-contentbottominfo-body">{user.website}</p>
                                    </div>
                                </div>
                    </div>
            ))}
        </div>
    )
}

export default About;