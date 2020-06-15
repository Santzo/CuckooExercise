import React from 'react'
// import Button from '../components/Button';
import Post from '../components/Post';
import { getAllPosts } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoggedInView extends React.Component {
    state = {
        posts: []
    }
    static propTypes = {
        getAllPosts: PropTypes.func.isRequired
    }

    // Check for new posts every 5 seconds.
    refreshPosts = async () => {
        const posts = await this.getPosts();
        const equal = JSON.stringify(posts) === JSON.stringify(this.state.posts);
        if (equal) return;
        this.setState({ posts });
    }

    // When component mounts, immediately fetch all posts for display
    componentDidMount = async () => {
        const posts = await this.getPosts();
        this.setState({ posts })
        // Set application to automatically check for new posts every 5 seconds.
        setInterval(this.refreshPosts, 5000);
    }

    getPosts = async () => {
        const response = await this.props.getAllPosts();
        const posts = response.map((post, index) => <Post index={index} key={post._id} data={post} />)
        return posts;
    }
    render() {
        return (
            <div className="view-container">
                {this.state.posts.length === 0 && <h1 className="view-text">There is nothing here.</h1>}
                {this.state.posts}
            </div>
        )
    }
}
export default connect(null, { getAllPosts })(LoggedInView);