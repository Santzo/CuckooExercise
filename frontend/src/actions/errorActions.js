import { GET_ERRORS, CLEAR_ERRORS, SIGNUP_ERROR } from './actionTypes'

export const returnErrors = (msg, status, id) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
};
export const signUpError = (userNameTaken, emailTaken) => {
    return {
        type: SIGNUP_ERROR,
        payload: { userNameTaken, emailTaken }
    };
};
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
