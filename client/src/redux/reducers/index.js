import {combineReducers} from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import profile from './profileReducer';
import homePost from './postReducer';
import status from './statusReducer'

export default combineReducers({
auth,
alert,
profile,
  homePost,
  status

});