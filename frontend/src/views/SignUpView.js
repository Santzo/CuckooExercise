import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../actions/authActions';

class SignUpView extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object,
        signup: PropTypes.func.isRequired
    };

    onSubmit = async e => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const signUpData = {
            name,
            email,
            password
        }
        this.props.signup(signUpData);

    }

    onFieldChange = e => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        return (
            <div className="view-container">
                <h1 className="view-text">Sign up for a new account</h1>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input className="form-input" type="text" name="name" onChange={this.onFieldChange} required />
                        {this.props.error.userNameTaken && <p className="form-error">Username already taken.</p>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input className="form-input" type="email" name="email" onChange={this.onFieldChange} required />
                        {this.props.error.emailTaken && <p className="form-error">This email address is already in use.</p>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input className="form-input" type="password" name="password" onChange={this.onFieldChange} required />
                    </div>
                    <input type="submit" value="Sign Up" className="button form-button" />
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { signup })(SignUpView);