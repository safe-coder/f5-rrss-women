
import React from "react";
import "../styles/ProfileAbout.css"
import CircleIcon from '@mui/icons-material/Circle';
import { RadioGroup } from "@mui/material";
const About = ({userData, auth,profile, id}) =>{

   

    return(
        <div className="profileabout">
                    <div className="profileabout-contenttop">
                        <h4 className="profileabout-contenttop-head">Sobre Mi</h4>
                        <CircleIcon fontSize="small" className="closebtn" style={{paddingRight:"1rem", color:"#FF6D00"}}/>
                        </div>
            {userData.length > 0 && userData.map((user) => (
                <div className="profileabout-container" key={user._id}>
                        <div className="profileabout-contentcenter">
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