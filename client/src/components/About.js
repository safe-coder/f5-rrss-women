
import React from "react";
import "../styles/ProfileAbout.css"
import CircleIcon from '@mui/icons-material/Circle';
import { RadioGroup } from "@mui/material";
import moment from "moment";


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
                                    <h6 className="profileabout-contentbottominfo-head">Fem-5 desde</h6>
                                    <p className="profileabout-contentbottominfo-body">{moment(user.createdAt).format('YYYY-MM-DD')}</p>
                                    </div>
                                    <div className="profileabout-contentbottominfo">
                                    <h6 className="profileabout-contentbottominfo-head">Ubicación</h6>
                                    <p className="profileabout-contentbottominfo-body">{user.address}</p>
                                    </div>
                                    <div className="profileabout-contentbottominfo">
                                    <h6 className="profileabout-contentbottominfo-head">Email</h6>
                                    <p className="profileabout-contentbottominfo-body">{user.email}</p>
                                    </div>
                                    <div className="profileabout-contentbottominfo">
                                    <h6 className="profileabout-contentbottominfo-head">Website</h6>
                                    <a href={`${user.website}`}  target="_blank" rel="noopener noreferrer" className='profileabout-contentbottominfo-body'> {user.website} </a>
                                    </div>
                                </div>
                    </div>
            ))}
        </div>
    )
}

export default About;