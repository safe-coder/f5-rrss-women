import {getDataApi} from "../../utils/fetchDataApi";


export const ADMIN_TYPES= {
    LOADING_USERS: 'LOADING_USERS',
    GET_USERS: 'GET_USERS',
}


export const getUsers = (token) => async (dispatch) =>{
    try {
       dispatch({type: ADMIN_TYPES.LOADING_USERS, payload: true})
        const res = await getDataApi('users',token)
       dispatch({type:ADMIN_TYPES.GET_USERS , payload: res.data}) 
       dispatch({type: ADMIN_TYPES.LOADING_USERS, payload:false})

    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}
