import React from 'react'
import { connect } from 'react-redux';
import { logOut } from '../actions/authActions';
import { checkForLoggedIn } from '../actions/viewActions';
import PropTypes from 'prop-types';
import NewPost from '../components/NewPost';

// The navbar
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
    close = () => this.setState({ newPost: false });
    mainScreen = () => this.props.checkForLoggedIn();
    render() {
        // Check if the user has clicked 'New Post' -button to determine whether 
        // to show the input box or not
        const npClass = this.state.newPost ? 'new-post show' : 'new-post hidden';
        const userNameFontSize = this.props.user != null ? Math.max(3 - this.props.user.name.length * 0.125, 1.8) + "rem" : 1.8 + "rem";
        return (
            <div>
                <NewPost className={npClass} posted={this.close} />
                <div className="header">
                    <div className="header-left">
                        <h1 className="header-text" style={{ cursor: 'pointer' }} onClick={this.mainScreen}>Cuckoo Notes</h1>
                    </div>
                    {this.props.user &&
                        <div className="nav">
                            {/* Hamburger menu is only shown when in mobile resolution */}
                            <label id="hamburger" htmlFor="hamburger-toggle">&#9776;</label>
                            <input id="hamburger-toggle" type="checkbox" />
                            <div className="nav-menu">
                                <h1 className="nav-text" style={{ fontSize: userNameFontSize }}>{this.props.user.name}</h1>
                                <button className="button nav-button" onClick={this.newPost}>New Post</button>
                                <button className="button nav-button" onClick={this.props.logOut}>Log Out</button>
                            </div>
                        </div>}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user: state.auth.user
});
export default connect(mapStateToProps, { logOut, checkForLoggedIn })(Header);
