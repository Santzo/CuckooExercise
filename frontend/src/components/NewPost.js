import React from 'react'
import { connect } from 'react-redux';
import { newPost } from '../actions/authActions';
import PropTypes from 'prop-types';

class NewPost extends React.Component {
    state = {
        title: '',
        message: ''
    }
    static propTypes = {
        newPost: PropTypes.func.isRequired
    }
    onFieldChange = e => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ [nam]: val });
    }
    onSubmit = e => {
        e.preventDefault();
        this.props.newPost(this.state);
    }
    render() {
        return (
            <div className="new-post">
                <h1 className="header-text small">Post a new message</h1>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input className="form-new-post" type="text" name="title" onChange={this.onFieldChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea className="textarea-new-post" type="text" name="message" onChange={this.onFieldChange} />
                    </div>
                    <input type="submit" value="Post Message" className="button form-button new-post-button" />
                </form>
            </div>
        );
    }
}
export default connect(null, { newPost })(NewPost);