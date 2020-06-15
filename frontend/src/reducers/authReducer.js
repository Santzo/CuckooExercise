import {
    USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_FAIL
} from '../actions/actionTypes';

const init = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default (state = init, action) => {
    switch (action.type) {
        case USER_LOADING:
            return Object.assign({}, state, { isLoading: true });
        case USER_LOADED:
            return Object.assign({}, state, { isAuthenticated: true, isLoading: false, user: action.payload });
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return Object.assign({}, state, action.payload, { isAuthenticated: true, isLoading: false });
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case SIGNUP_FAIL:
            localStorage.removeItem('token');
            return Object.assign({}, state, { token: null, user: null, isAuthenticated: false, isLoading: false });
        case AUTH_ERROR:
            return Object.assign({}, state, { user: null, isAuthenticated: false, isLoading: false });
        default:
            return state;

    }
}