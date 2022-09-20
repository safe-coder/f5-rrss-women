import {getDataApi} from "../../utils/fetchDataApi";


export const ADMIN_TYPES= {
    GET_USERS: 'GET_USERS',
}


export const getUsers = () => async (dispatch) =>{
    try {
      
        const res = await getDataApi('users','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjQ3MWQ1Mzk0Njg3M2Y4MzA1NmViMyIsImlhdCI6MTY2MzYyNzcxMiwiZXhwIjoxNjYzNzE0MTEyfQ.MUh6slc8-KN-rZ-4lYPG1na_ubSZTg3LKSVA2RAicHI')
        console.log(res);
       dispatch({type:ADMIN_TYPES.GET_USERS , payload: res.data}) 
    

    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}
