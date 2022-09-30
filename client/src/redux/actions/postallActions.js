import {imageupload} from "../../utils/imageupload"
import { getDataApi, postDataApi } from "../../utils/fetchDataApi";
import {POST_TYPES} from "./postActions"


export const POSTALL_TYPES= {
  
  GET_ALL: "GET_ALL",
  
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