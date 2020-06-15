import { NOT_LOGGEDIN_VIEW, LOGGEDIN_VIEW, SIGNUP_VIEW, LOGIN_VIEW } from '../actions/actionTypes';
import LoggedInView from '../views/LoggedInView';
import SignUpView from '../views/SignUpView';
import MainView from '../views/MainView';
import LogInView from '../views/LogInView';
import React from 'react';


const init = null;

export default (state = init, action) => {
    switch (action.type) {
        case NOT_LOGGEDIN_VIEW:
            return <MainView />
        case LOGGEDIN_VIEW:
            return <LoggedInView />;
        case SIGNUP_VIEW:
            return <SignUpView />;
        case LOGIN_VIEW:
            return <LogInView />;
        default:
            return state;
    };
}