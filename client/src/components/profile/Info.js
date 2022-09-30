import React, { useEffect, useState } from "react";

import "../../styles/ProfileInfo.css";
import SettingsIcon from '@mui/icons-material/Settings';
import EditProfile from "./EditProfile";
import GlobalFriendBtn from "./GlobalFriendBtn";
import PanelAdminBtn from "./PanelAdminBtn";

const Info = ({ userData, auth, profile, id }) => {
  // const [userData, setUserData] = useState([]);
  // const { id } = useParams();
  // const { auth, profile } = useSelector((state) => state);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (auth && auth.user && id === auth.user._id){
  //       setUserData([auth.user])
  //   }else{
  //     dispatch(getProfileUsers({users:profile.users, id, auth}))
  //     const newData = profile.users.filter(user=>user._id === id)
  //     setUserData(newData)
  //   }
  // }, [id, auth.user, auth, profile.users, dispatch]);


  const [onEdit, setOnEdit]= useState(false)


  return (
    <div className="profileinfo">
      {userData.length > 0 &&
        userData.map((user) => (
          <div className="profileinfo-container" key={user._id}>
            <div className="profileinfo-top">
              <img src={user.banner} alt="" />
            </div>
            <div className="profileinfo-center">
              <img
                className="profileinfo-centeravatar"
                src={user.avatar}
                alt=""
              />
              {user._id && auth && user._id === auth.user._id ?
                <button className="profileinfo-centerbutton" onClick={() => setOnEdit(true)}><SettingsIcon fontSize="large"/></button>
                :<GlobalFriendBtn classbtn="profileinfo-centerbutton" user={user}/>
                }

            {user._id && auth && user.role === 'admin' ?
            <PanelAdminBtn /> : null

    
                }
                
               
            </div>
            <div className="profileinfo-bottom">
              <div className="profileinfo-bottomleft">
                <div className="profileinfo-stat">
                  <h6 className="profileinfo-statnumber">
                    {user.friends.length}
                  </h6>
                  <h6 className="profileinfo-statdesc">SEGUIDORAS</h6>
                </div>
                {/* <div className="profileinfo-stat">
                  <h6 className="profileinfo-statnumber">
                    {user.following.length}
                  </h6>
                  <h6 className="profileinfo-statdesc">SIGUIENDO</h6>
                </div> */}
              </div>
              <div className="profileinfo-bottomcenter">
                <h3 className="profileinfo-fullname">{user.fullname}</h3>
                <h5 className="profileinfo-username">@{user.username}</h5>
              </div>
              <div className="profileinfo-bottomright">
                <div className="profileinfo-stat">
                  <h6 className="profileinfo-statnumber">
                    {user.following.length}
                  </h6>
                  <h6 className="profileinfo-statdesc">SIGUIENDO</h6>
                </div>
              </div>
              
            </div>
            {
              onEdit && <EditProfile user={ user} setOnEdit={setOnEdit} />
            }
          </div>
        ))}
    </div>
  );
};

export default Info;
