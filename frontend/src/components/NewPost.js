import React from 'react'
import { connect } from 'react-redux';
import { newPost } from '../actions/authActions';
import PropTypes from 'prop-types';

// New post component, when the user wants to post a new message
class NewPost extends React.Component {
    state = {
        title: '',
        message: '',
        isOpen: true
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
        this.props.posted();
        e.target.reset();
        this.setState({ title: '', message: '', isOpen: false });
    }
    render() {
        return (
            <div className={this.props.className}>
                <form autoComplete="off" className="form new-post-form" onSubmit={this.onSubmit}>
                    <h1 className="form-label" style={{ marginBottom: '20px' }}>Post a new message</h1>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input className="form-new-post" type="text" name="title" onChange={this.onFieldChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea className="textarea-new-post" type="text" name="message" onChange={this.onFieldChange} required />
                    </div>
                    <div className="button-row">
                        <input type="submit" value="Post Message" className="button form-button new-post-button" />
                        <input type="reset" value="Clear Fields" className="button form-button new-post-button" />
                        <input type="button" onClick={this.props.posted} value="Close" className="button form-button new-post-button" />
                    </div>
                </form>
            </div>
        );
    }
}
export default connect(null, { newPost })(NewPost);