import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import viewReducer from './viewReducer';
import postReducer from './postReducer';

// Combine all the required reducers for one big reducer to pass in to the Redux store
export default combineReducers({
    post: postReducer,
    error: errorReducer,
    auth: authReducer,
    view: viewReducer
});
