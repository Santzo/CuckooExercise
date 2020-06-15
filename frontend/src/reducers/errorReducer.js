import { GET_ERRORS, CLEAR_ERRORS, SIGNUP_ERROR } from '../actions/actionTypes';

const init = {
    msg: {},
    status: null,
    userNameTaken: false,
    emailTaken: false,
    id: null
}

export default (state = init, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                userNameTaken: action.payload.userNameTaken,
                emailTaken: action.payload.emailTaken,
                id: action.payload.id
            };
        case SIGNUP_ERROR:
            return Object.assign({}, state, {
                userNameTaken: action.payload.userNameTaken,
                emailTaken: action.payload.emailTaken
            })

        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                id: null
            };
        default:
            return state;
    }
}