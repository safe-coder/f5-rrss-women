import {POSTALL_TYPES} from "../actions/postallActions";


const inititalState = {
    post: [],
    loading:false,
    results:0,
    page:0
    
}


const postallReducer = (state = inititalState, action) => {
  switch (action.type) {

    case POSTALL_TYPES.GET_ALL:
      return {
        ...state,
        post: action.payload.posts,
        results: action.payload.result
      }
    default:
      return state
  };
}
export default postallReducer;