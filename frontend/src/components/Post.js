import React from 'react'

// Post component for showing posts
export default function Post(props) {
    return (
        <div className="post" style={props.index % 2 !== 0 ? { backgroundColor: '#ccc' } : {}} >
            <p className="post-title">{props.data.title}</p>
            <h2 className="post-author">Posted by {props.data.author}</h2>
            <p className="post-message">{props.data.message}</p>
            <p className="post-date">{props.data.date}</p>
        </ div>
    )


}