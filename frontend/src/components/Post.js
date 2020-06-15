import React from 'react'

export default function Post(props) {
    return (
        <div className="post" style={props.index % 2 != 0 ? { backgroundColor: '#ccc' } : {}} >
            <h1 className="post-title">{props.data.title}</h1>
            <h2 className="post-author">Posted by {props.data.author}</h2>
            <p className="post-message">{props.data.message}</p>
            <p className="post-date">{props.data.date}</p>
        </ div>
    )


}