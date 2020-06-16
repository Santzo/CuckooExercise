import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { LOGIN_FAIL } from '../actions/actionTypes';

class LogInView extends React.Component {
    state = {
        name: '',
        password: '',
    }
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        clearErrors: PropTypes.func.isRequired,
        error: PropTypes.object.isRequired
    }
    componentDidMount = () => {
        this.props.clearErrors();
    }
    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state);
    }
    onFieldChange = e => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        return (
            <div className="view-container">
                <h1 className="view-text">Login</h1>
                {this.props.error.msg === LOGIN_FAIL && <h1 className="form-error login-error">Wrong username or password</h1>}
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input className="form-input" type="text" name="name" onChange={this.onFieldChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input className="form-input" type="password" name="password" onChange={this.onFieldChange} required />
                    </div>
                    <input type="submit" value="Log In" className="button form-button" />
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    item: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LogInView);