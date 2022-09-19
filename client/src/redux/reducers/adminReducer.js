import {ADMIN_TYPES} from "../actions/adminActions";

const inititalState = {
    users: [],
    loading:false,
    results:0,
    page:0
    
}

const adminReducer = (state= inititalState, action) =>{
    switch(action.type){
       
        case ADMIN_TYPES.LOADING_POSTS:
            return {
                    ...state,
                   loading : action.payload
                }
        case ADMIN_TYPES.GET_POSTS:
            return{
                ...state,
                users: action.payload.users,
                results :action.payload.result
                }
        default: 
        return state
    }
}

export default adminReducer;