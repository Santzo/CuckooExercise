import React from 'react'
import Button from '../components/Button';
import { wantsToSignUp, wantsToLogin } from '../actions/viewActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MainView extends React.Component {
    static propTypes = {
        wantsToSignUp: PropTypes.func.isRequired,
        wantsToLogin: PropTypes.func.isRequired
    };
    render() {
        return (
            <div className="view-container">
                <h1 className="view-text">Welcome to the note posting service. Please log in or sign up for a new account.</h1>
                <Button text="Log in" onClick={this.props.wantsToLogin} />
                <Button text="Sign up" onClick={this.props.wantsToSignUp} />
            </div>
        )
    }
}

export default connect(null, { wantsToSignUp, wantsToLogin })(MainView);