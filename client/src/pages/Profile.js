import React from 'react'
import Info from '../components/Info'
import HomeMid from '../components/HomeMid'
import About from '../components/About'
import "../styles/Profile.css"
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getProfileUsers } from "../redux/actions/profileActions";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Friends from "../components/Friends";
import Following from "../components/Following";
import {Grid} from '@mui/material'
// import SingleUserPosts from "../components/SingleUserPosts";
// import SavedPost from "../components/SavedPost";

const Profile = () => {

  const [userData, setUserData] = useState([]);
  console.log(userData);
  const { id } = useParams();
  const { auth, profile } = useSelector(state => state);
  const dispatch = useDispatch();
  const [showaccount, setshowaccount] = useState(true);
const [showfriends, setshowfriends] = useState(false);
const [showfollowing, setshowfollowing] = useState(false);
const [showsaved, setshowsaved] = useState(false);

const handletoggle = (ht) =>{
    
    if(ht === 'showaccount'){
        setshowsaved(false);
        setshowfriends(false);
        setshowfollowing(false);
        setshowaccount(true)
    }else if(ht === 'showfriends'){
        setshowsaved(false);
        setshowfriends(true);
        setshowfollowing(false);
        setshowaccount(false)
    }else  if(ht === 'showfollowing'){
        setshowsaved(false);
        setshowfriends(false);
        setshowfollowing(true);
        setshowaccount(false)
    }else  if(ht === 'showsaved'){
        setshowsaved(true);
        setshowfriends(false);
        setshowfollowing(false);
        setshowaccount(false)
    }

}

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
      <Info userData={userData} profile={profile} auth={auth} id={ id}/>
      <div className ="profileheader">
              <div className="profileheader-items">
                  <IconButton className="profileheader-item" onClick={()=>handletoggle('showaccount')}>
                        <HomeIcon/>
                  </IconButton>
                  <IconButton onClick={()=>handletoggle('showfriends')}>
                        <PeopleIcon/>
                  </IconButton>
                  <IconButton onClick={()=>handletoggle('showfollowing')}>
                        <PersonAddIcon/>
                  </IconButton>
                  {/* <IconButton onClick={()=>handletoggle('showsaved')}>
                        <BookmarksIcon/>
                  </IconButton> */}
                  
              </div>
        </div>  
        { showaccount &&
            <Grid container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
            className="profilebody">
                <Grid item md={3} className='profilebody-left'>
                <About userData={userData} profile={profile} auth={auth} id={ id}/>
            </Grid>
            <Grid item md={4} className='profilebody-center'>
                <HomeMid/>
            </Grid>
            <Grid item  md={3} className='profilebody-right'>
              
            </Grid>
         
              </Grid>
}
{
    showfriends && <Friends userData={userData} dispatch={dispatch} profile={profile} auth={auth} id={id}/>
}
{
    showfollowing && <Following  userData={userData} dispatch={dispatch} profile={profile} auth={auth} id={id}/>
}
{/* {
    showsaved && <SavedPost auth={auth}  />
} */}
        </div>  
  )
}

export default Profile