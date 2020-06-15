import {
    USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_FAIL, LOGGEDIN_VIEW, NOT_LOGGEDIN_VIEW, CLEAR_ERRORS
} from '../actions/actionTypes';
import { returnErrors, signUpError } from './errorActions'


// Load user at page start up to check if user is logged in or not
export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    const token = tokenConfig(getState);
    try {
        const response = await fetch('/api/users/user', token);
        if (response.status !== 200) {
            const errData = await response.json();
            throw new Error(response.status, response.statusText);
        }
        const data = await response.json();
        // Success
        dispatch({ type: USER_LOADED, payload: data });
        dispatch({ type: LOGGEDIN_VIEW });
        dispatch({ type: CLEAR_ERRORS });
    }
    catch (err) {
        dispatch(returnErrors(err.name, err.message));
        dispatch({ type: AUTH_ERROR });
        dispatch({ type: NOT_LOGGEDIN_VIEW });
    }


};
export const logOut = () => dispatch => {
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch({ type: NOT_LOGGEDIN_VIEW });
}

// Log in action
export const login = ({ name, password }) => async dispatch => {
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    };

    try {
        const response = await fetch('/api/users/login', config)
        if (response.status !== 200) {
            const data = await response.json();
            dispatch({ type: LOGIN_FAIL });
            dispatch(returnErrors(LOGIN_FAIL, response.status))
            return;
        }
        const data = await response.json();
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        dispatch({ type: LOGGEDIN_VIEW });
        dispatch({ type: CLEAR_ERRORS });
    }
    catch (err) {
        dispatch(returnErrors(LOGIN_FAIL, ""));
        dispatch({ type: LOGIN_FAIL });
    }

}


// Sign up action
export const signup = ({ name, email, password }) => async dispatch => {
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    };

    try {
        const response = await fetch('/api/users/signup', config)
        if (response.status !== 200) {
            const data = await response.json();
            console.log(data.userNameTaken + ", " + data.emailTaken);
            dispatch(signUpError(data.userNameTaken, data.emailTaken));
            dispatch({ type: SIGNUP_FAIL });
            return;
        }
        const data = await response.json();
        console.log(data);
        dispatch({ type: SIGNUP_SUCCESS, payload: data });
        dispatch({ type: LOGGEDIN_VIEW });
    }
    catch (err) {
        dispatch(returnErrors(err.name, err.message));
        dispatch({ type: SIGNUP_FAIL });
    }

}

// Get all posts
export const getAllPosts = () => async (dispatch, getState) => {
    const token = tokenConfig(getState);
    try {
        const response = await fetch('/api/messages', token);
        if (response.status !== 200) {
            const errData = await response.json();
            throw new Error(response.status, response.statusText);
        }
        const data = await response.json();
        // Success
        return data;
    }
    catch (err) {
        dispatch(returnErrors(err.name, err.message));
        dispatch({ type: AUTH_ERROR });
        dispatch({ type: NOT_LOGGEDIN_VIEW });
    }
}
export const newPost = ({ title, message }) => async (dispatch, getState) => {
    console.log(title, message);
    const token = tokenConfig(getState);
    const author = getState().auth.user.name;
    token.method = 'POST';
    token.body = JSON.stringify({ title, message, author });
    try {
        const response = await fetch('/api/messages', token);
        if (response.status !== 200) {
            const errData = await response.json();
            throw new Error(response.status, response.statusText);
        }
        const data = await response.json();
        console.log(data);
        // Success
        //return data;
    }
    catch (err) {
        dispatch(returnErrors(err.name, err.message));
        dispatch({ type: AUTH_ERROR });
        dispatch({ type: NOT_LOGGEDIN_VIEW });
    }
}

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}

