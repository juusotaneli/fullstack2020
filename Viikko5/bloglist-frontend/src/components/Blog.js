import React from 'react'

const Blog = (props) => (
    <>
        <p> {props.blog.title} {props.blog.author} {props.blog.url} {props.blog.likes} added by {props.blog.user.name} </p>
    </>
)
export default Blog