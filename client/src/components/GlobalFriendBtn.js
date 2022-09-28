import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {addfriends , unfriends} from "../redux/actions/profileActions"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const GlobalFriendBtn = ({classbtn, user}) => {

    const {auth, profile, socket} = useSelector(state => state);
    const dispatch = useDispatch();

    const [friend,setFriend] = useState(false)
    const [load, setLoad] = useState(false)
   
useEffect(()=>{
    if(auth.user.following.find(item => item._id === user._id)){
        setFriend(true)

    }
},[auth.user.following,user._id])

    const addfriend = () => {
        if(load) return;
        setFriend(true)
        setLoad(true)
        dispatch(addfriends({users:profile.users, user, auth, socket}))
        setLoad(false)
        
    }
    const removefriend = () =>{
        if(load) return;
        setFriend(false)
        setLoad(true)
        dispatch(unfriends({users:profile.users, user, auth}))
        setLoad(false)
    }
  return (
    <>
     {
            friend ? 
              <button className={classbtn} onClick = {removefriend} style={{color:'#240046', backgroundColor: "#FF6D00"}}><PersonRemoveIcon fontSize="large"/></button>
            : <button className={classbtn} onClick = {addfriend}><PersonAddIcon fontSize="large"/></button>
        }
    </>
  )
}

export default GlobalFriendBtn;
