import {PROFILE_TYPES} from '../actions/profileActions';
import {EditData} from "../actions/alertActions"



const initialState = {
    loading: false,
    users: [],
    posts : [],
    ids:[],
    userposts:[]
}

export const profileReducer = (state = initialState , action) => {
    
    switch(action.type){
        case PROFILE_TYPES.LOADING:
            return{
                ...state,
                loading:action.payload
            }
        case PROFILE_TYPES.GET_USER:
            return{
                ...state,
                users:[...state.users, action.payload.user]
            }
            case PROFILE_TYPES.FRIEND:
                return{
                    ...state,
                    users: EditData(state.users, action.payload._id, action.payload )
                        
                
                }
            case PROFILE_TYPES.UNFRIEND:
                    return{
                        ...state,
                        users: EditData(state.users, action.payload._id, action.payload )
                    }
      
        default:
            return state
    }
}

export default profileReducer;