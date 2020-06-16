import { NOT_LOGGEDIN_VIEW, LOGGEDIN_VIEW, SIGNUP_VIEW, LOGIN_VIEW } from './actionTypes';

// View actions to determine which view layout to show the user

export const wantsToSignUp = () => dispatch => {
    dispatch({ type: SIGNUP_VIEW });
}
export const wantsToLogin = () => dispatch => {
    dispatch({ type: LOGIN_VIEW });
}
export const notLoggedIn = () => dispatch => {
    dispatch({ type: NOT_LOGGEDIN_VIEW });
}
export const checkForLoggedIn = () => (dispatch, getState) => {
    const auth = getState().auth.isAuthenticated;
    dispatch({ type: auth ? LOGGEDIN_VIEW : NOT_LOGGEDIN_VIEW });
}