import {ADMIN_TYPES} from "../actions/adminActions";

const inititalState = {
    user: []
    
}

const adminReducer = (state= inititalState, action) =>{
    switch(action.type){

        case ADMIN_TYPES.GET_USERS:
            return{
           ...state,
                user: action.payload.users,
            
                }
        default: 
        return state
    }
}

export default adminReducer;