import React from 'react';
import { connect } from 'react-redux';
import { notLoggedIn } from '../actions/viewActions';
import { loadUser } from '../actions/authActions'
import PropTypes from 'prop-types';
import Store from '../store';

class IndexView extends React.Component {

    componentDidMount() {
        this.props.loadUser();
    }
    render() {
        return (
            <div>
                {this.props.view}
            </div>
        )
    };
}

IndexView.propTypes = {
    view: PropTypes.object,
    user: PropTypes.object,
    loadUser: PropTypes.func.isRequired,
    notLoggedIn: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    view: state.view,
    user: state.auth
})

export default connect(mapStateToProps, { notLoggedIn, loadUser })(IndexView);