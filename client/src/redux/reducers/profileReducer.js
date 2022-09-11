import {PROFILE_TYPES} from '../actions/profileActions';



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
                users:[...state.users, action.payload]
            }
      
        default:
            return state
    }
}

//export default profileReducer;