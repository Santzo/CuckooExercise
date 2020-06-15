import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import viewReducer from './viewReducer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    view: viewReducer
});
