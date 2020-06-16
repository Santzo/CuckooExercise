import React from 'react'
// import Button from '../components/Button';
import Post from '../components/Post';
import { getAllPosts } from '../actions/authActions';
import { postUpdated } from '../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoggedInView extends React.Component {
    state = {
        posts: null,
        updater: null,
    }
    static propTypes = {
        getAllPosts: PropTypes.func.isRequired,
        postUpdated: PropTypes.func.isRequired,
        newPost: PropTypes.bool
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
        this.setState({ updater: setInterval(this.refreshPosts, 5000) });
    }
    shouldComponentUpdate = (prev, next) => {
        // Update component _only_ if a new post has been made.
        return prev.newPost != next.newPost;
    }
    componentDidUpdate = () => {
        console.log(this.props.newPost);
        // Redux updates state whenever a new post is sent, so we can update the list immediately on 
        // client side. If 'newPost' is true, update the posts immediately
        if (this.props.newPost) {
            this.refreshPosts();
            // Set newPost back to false again
            this.props.postUpdated();
        }
    }
    componentWillUnmount = () => {
        // When component unmounts (user logs out), clear the setInterval
        clearInterval(this.state.updater);
    }

    getPosts = async () => {
        const response = await this.props.getAllPosts();
        const posts = response.map((post, index) => <Post index={index} key={post._id} data={post} />)
        return posts;
    }
    render() {
        return (
            <div className="view-container">
                {this.state.posts != null && this.state.posts.length === 0 &&
                    <h1 className="view-text">There is nothing here.</h1>}
                {this.state.posts}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    newPost: state.post
})
export default connect(mapStateToProps, { getAllPosts, postUpdated })(LoggedInView);