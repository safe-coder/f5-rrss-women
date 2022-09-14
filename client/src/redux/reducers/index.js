import {combineReducers} from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import profile from './profileReducer';
import homePost from './postReducer';

export default combineReducers({
auth,
alert,
profile,
homePost
});