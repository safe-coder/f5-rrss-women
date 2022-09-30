import {imageupload} from "../../utils/imageupload"
import { getDataApi, postDataApi } from "../../utils/fetchDataApi";
import {POST_TYPES} from "./postActions"


export const POSTALL_TYPES= {
  
  GET_ALL: "GET_ALL",
  
}

export const createpost = ({content, images, auth}) => async(dispatch) => {
    
    
  let media= [];

  try {

      dispatch({type:'ALERT', payload:{loading: true}})
      
      if(images.length > 0) media = await imageupload(images);
    
      const res = await postDataApi('posts', {content, images: media}, auth.token)
      console.log(res)
      dispatch({type: POST_TYPES.CREATE_POST, payload: {...res.data.newPost, user: auth.user}})
      dispatch({type:'ALERT', payload:{loading: false}})
      
     
      //notify
      // const msg = {
      //     id: res.data.newPost._id,
      //     text:'added a new Post',
      //     url: `/post/${res.data.newPost._id}`,
      //     recipients: res.data.newPost.user.friends,
      //     content,
      //     image:media[0].secure_url,

      // }
      // dispatch(createNotify({msg, auth}))

  } catch (err) {
      dispatch({
          type:'ALERT',
          payload:{
              error: "Do not"
          }
      })
      
  }
}


export const getPosts = (token) => async (dispatch) => {
  try {
     dispatch({type: POST_TYPES.LOADING_POSTS, payload: true})
      const res = await getDataApi('postall',token)
     dispatch({type:POSTALL_TYPES.GET_ALL , payload: res.data}) 
     dispatch({type: POST_TYPES.LOADING_POSTS, payload:false})

  } catch (err) {
      dispatch({
          type:'ALERT',
          payload:{
              error: err.response.data.msg
          }
      })
  }
}