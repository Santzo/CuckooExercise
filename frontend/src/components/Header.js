import React from 'react'
import { connect } from 'react-redux';
import { logOut } from '../actions/authActions';
import { checkForLoggedIn } from '../actions/viewActions';
import PropTypes from 'prop-types';
import NewPost from '../components/NewPost';

class Header extends React.Component {
    state = {
        newPost: false
    }
    static propTypes = {
        user: PropTypes.object,
        logOut: PropTypes.func.isRequired,
        checkForLoggedIn: PropTypes.func.isRequired
    }
    newPost = () => this.setState({ newPost: true });
    mainScreen = () => this.props.checkForLoggedIn();
    render() {
        return (
            <div className="header">
                {this.state.newPost && <NewPost />}
                <div className="header-left">
                    <a className="header-text" style={{ cursor: 'pointer' }} onClick={this.mainScreen}>Cuckoo Notes</a>
                    {this.props.user &&
                        <button className="button header-button" onClick={this.newPost}>New Post</button>
                    }
                </div>
                {this.props.user &&
                    <div className="header-right">
                        <h1 className="header-text small">{this.props.user.name}</h1>
                        <button className="button header-button" onClick={this.props.logOut}>Log Out</button>
                    </div>}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user: state.auth.user
});
export default connect(mapStateToProps, { logOut, checkForLoggedIn })(Header);
