import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import profile from "./profileReducer";
import homePost from "./postReducer";
import status from "./statusReducer";
import usersList from "./adminReducer";
import postAll from "./postallReducer"

export default combineReducers({
  auth,
  alert,
  profile,
  homePost,
  status,
  usersList,
  postAll
});
