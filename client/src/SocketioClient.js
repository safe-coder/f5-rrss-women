import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {POST_TYPES} from "./redux/actions/postActions.js"

const SocketioClient = () => {

  const {auth, socket} = useSelector(state => state);
  const dispatch = useDispatch();
  
  useEffect(() => {

    socket.emit('joinUser', auth.user._id)
  }, [socket, auth.user._id])
  

  useEffect(()=>{
    socket.on('likeToClient', newPost => {
       
    dispatch({type:POST_TYPES.UPDATE_POST, payload:newPost})})
    return ()=>socket.off('likeToClient')
},[socket,dispatch])
  
useEffect(()=>{
  socket.on('unlikeToClient', newPost=>{
  dispatch({type:POST_TYPES.UPDATE_POST, payload: newPost})})
  return ()=>socket.off('unlikeToClient')
},[socket,dispatch])


  useEffect(()=>{
    socket.on('createCommentToClient', newPost => {
    dispatch({type:POST_TYPES.UPDATE_POST, payload: newPost})})
    return ()=>socket.off('createCommentToClient')
},[socket,dispatch])

useEffect(()=>{
  socket.on('deleteCommentToClient', newPost=>{
  dispatch({type:POST_TYPES.UPDATE_POST, payload: newPost})})
  return ()=>socket.off('deleteCommentToClient')
},[socket,dispatch])

useEffect(()=>{
  socket.on('addfriendToClient', newUser =>{
  dispatch({type:'AUTH', payload: {...auth, user: newUser}})})

  return ()=>socket.off('addfriendToClient')
},[socket,dispatch,auth])

useEffect(()=>{
  socket.on('unfriendToClient', newUser =>{
  dispatch({type:'AUTH', payload: {...auth, user: newUser}})})
  
  return ()=>socket.off('unfriendToClient')
},[socket,dispatch , auth])

}

export default SocketioClient
