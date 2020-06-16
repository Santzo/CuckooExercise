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
                <h1 className="view-text" style={{ marginBottom: '1.5%' }}>Welcome to the note posting service. Please login or sign up for a new account.</h1>
                <Button text="Login" onClick={this.props.wantsToLogin} />
                <Button text="Sign Up" onClick={this.props.wantsToSignUp} />
            </div>
        )
    }
}

export default connect(null, { wantsToSignUp, wantsToLogin })(MainView);