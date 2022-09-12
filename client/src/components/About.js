
import React from "react";

const About = ({userData, auth,profile, id}) =>{

   

    return(
        <div className="profileabout">
            {userData.length > 0 && userData.map((user) => (
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