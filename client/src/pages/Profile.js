import React from 'react'
import Info from '../components/Info'
import Posts from '../components/Posts'
import About from '../components/About'
import "../styles/Profile.css"
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getProfileUsers } from "../redux/actions/profileActions";
import { useEffect, useState } from "react";





const Profile = () => {

  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const { auth, profile } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth && auth.user && id === auth.user._id){
        setUserData([auth.user])
    }else{
      dispatch(getProfileUsers({users: profile.users, id, auth}))
      const newData = profile.users.filter(user=>user._id === id)
      setUserData(newData)
    }
  }, [id, auth, profile.users, dispatch]);

  return (
    <div className="profile">
      <Info userData={userData} profile={profile} auth={auth} id={ id} />
            <div className="profilebody">
                <div className='profilebody-left'>
                <About userData={userData} profile={profile} auth={auth} id={ id}/>
            </div>
            <div className='profilebody-center'>
                <Posts />
            </div>
            <div className='profilebody-right'>
                {/* <Posts /> */}
            </div>
         
              </div>
        </div>  
  )
}

export default Profile