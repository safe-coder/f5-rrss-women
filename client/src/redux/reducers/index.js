import {combineReducers} from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import { profileReducer } from './profileReducer';


export default combineReducers({
auth,
alert,
profileReducer
});