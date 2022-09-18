
import {getDataApi, patchDataApi} from '../../utils/fetchDataApi'
import { ALERT_TYPES } from '../actions/alertActions';
import {createNotify, removeNotify} from "./notifyActions"
import { DeleteData} from "./alertActions"
import { imageupload } from "../../utils/imageupload";
import axios from "axios";

export const PROFILE_TYPES = {

    LOADING : 'LOADING',
    GET_USER : 'GET_USER',
    FRIEND: 'FRIEND',
    UNFRIEND:'UNFRIEND',
    LOADING_USERS: 'LOADING_USERS',
    GET_USERS: 'GET_USERS',
}




export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: { loading: true } });
        const res = await getDataApi(`user/${id}`, auth.token);

        dispatch({
          type: PROFILE_TYPES.GET_USER,
          payload: res.data,
        });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: { loading: false } });
      } catch (err) {
        dispatch({
          type: "ALERT",
          payload: {
            error: err.response.data.msg,
          },
        });
      }
    }
}

export const addfriends = ({users, user, auth, socket}) => async (dispatch) =>{
    console.log({users, user, auth})
    let newUser;
    if(users.every(item => item._id !== user._id)){
         newUser = {...user, friends:[...user.friends, auth.user]}
        console.log(newUser)
    }else {
        users.forEach(item =>{
            if(item._id === user._id){
                newUser = {...item, friends:[...item.friends, auth.user]}
            }
        })
    }
    
    
        
       
        dispatch({
            type: PROFILE_TYPES.FRIEND,
            payload:newUser
            
        })
    
        dispatch ({
            type:'AUTH',
            payload : {
                ...auth, 
                user: {...auth.user , following: [...auth.user.following, newUser]}
            }
        })
    
      
        try {
            const res = await patchDataApi(`user/${user._id}/friend`, null, auth.token)
            socket.emit('addfriend', res.data.newUser)
            
            const msg = {
                id: auth.user._id,
                text: 'add you as friend you',
                url: `/profile/${auth.user._id}`,
                recipients: [newUser._id],
                
    
            }
            dispatch(createNotify({msg, auth, socket}))
        } catch (err) {
            dispatch({
                type:'ALERT',
                payload:{
                    error: err.response.data.msg
                }
            })
        }
    }
    
    export const unfriends = ({users, user, auth,socket}) => async (dispatch) =>{
    
        
        
    let newUser;
    if(users.every(item => item._id !== user._id)){
        newUser = {...user, friends: DeleteData(user.friends, auth.user._id)}
    }else {
        users.forEach(item =>{
            if(item._id === user._id){
                newUser = {...item, friends: DeleteData(item.friends, auth.user._id)}
            }
        })
    }
     
       dispatch({
            type: PROFILE_TYPES.UNFRIEND,
            payload:newUser
            
        }) 
    
        dispatch ({
            type:'AUTH',
            payload : {
                ...auth, 
                user: {...auth.user , following:DeleteData(auth.user.following, newUser._id)}
            }
        })
      
        try {
    
            const res = await patchDataApi(`user/${user._id}/unfriend`, null, auth.token)
            socket.emit('unfriend', res.data.newUser)
    
            const msg = {
                id: auth.user._id,
                text: 'unfriend you',
                url: `/profile/${auth.user._id}`,
                recipients: [newUser._id],
                
    
            }
            dispatch(removeNotify({msg, auth, socket}))
        } catch (err) {
            dispatch({
                type:'ALERT',
                payload:{
                    error: err.response.data.msg
                }
            })
        }
    }


export const updateProfile =
  ({ editData, avatar,banner, auth }) =>
  async (dispatch) => {
    if (!editData.fullname)
      return dispatch({
        type: "ALERT",
        payload: { error: "Add you fullname" },
      });
    if (editData.fullname.length > 25)
      return dispatch({
        type: "ALERT",
        payload: { error: "fullname  too long" },
      });
    if (editData.story.length > 200)
      return dispatch({ type: "ALERT", payload: { error: "story too long" } });

    try {
      let media;

      dispatch({ type: "ALERT", payload: { loading: true } });
        if (avatar) media = await imageupload([avatar]);
        if (banner) media = await imageupload([banner]);
        const res = await axios.patch("http://localhost:5000/api/user", {
            ...editData,
            avatar: avatar ? media[0].secure_url : auth.user.avatar,
            banner: banner ? media[0].secure_url : auth.user.banner
        },
            {
           headers : {Authorization: auth.token}
       })

       
        dispatch({
            type: 'AUTH',
            payload: {
                ...auth,
                user: {
                    ...auth.user,
                    ...editData,
                    avatar: avatar ? media[0].secure_url : auth.user.avatar,
                    banner: banner ? media[0].secure_url : auth.user.banner
                }
            }
        
        }) 
        
        dispatch({ type: "ALERT", payload: { loading: false} });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

  export const getUsers = (token) => async (dispatch) =>{
    try {
       dispatch({type: PROFILE_TYPES.LOADING_POSTS, payload: true})
        const res = await getDataApi('users',token)
       dispatch({type:PROFILE_TYPES.GET_POSTS , payload: res.data}) 
       dispatch({type: PROFILE_TYPES.LOADING_POSTS, payload:false})

    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}
