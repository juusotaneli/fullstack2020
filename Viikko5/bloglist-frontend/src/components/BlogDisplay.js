import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogDisplay = (props) => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const blogFormRef = React.createRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const showBlogs = () => (
        blogs.map(b =>
            contentVisibility(b)
        )
    )
    const addLike = async (blog) => {
        let returnedBlog = await blogService.update({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            visible: blog.visible,
        }, blog.id)
        setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
    }
    const contentVisibility = (blog) => {

        if (blog.visible === false) {
            return (
                <div key={blog.id} style={blogStyle}>
                    <div>{blog.title} {blog.author} <button onClick={() => handleToggleVisibility(blog)}>view</button><br />
                    </div>
                </div>
            )
        } else {
            return (
                <div key={blog.id} style={blogStyle}>
                    <div>{blog.title} {blog.author} <button onClick={() => handleToggleVisibility(blog)}>hide</button></div>
                    <div>{blog.url} </div>
                    <div>likes {blog.likes} <button onClick={() => addLike(blog)}>like</button> </div>
                    <div>added by {blog.user.name} </div>
                </div>
            )
        }
    }
    const handleToggleVisibility = async (blog) => {
        let returnedBlog = await blogService.update({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes,
            visible: !blog.visible,
        }, blog.id)
        setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))

    }
    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        try {
            let b = await blogService.create({
                title: blogObject.title,
                author: blogObject.author,
                url: blogObject.url,
                visible: false,
            })
            setBlogs(blogs.concat(b))
            setNotification(`a new blog ${b.title} by ${b.author} was added`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (exception) {
            console.log(blogObject)
            setErrorMessage('something went wrong')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    const showBlogForm = () => {
        return (
            <div>
                <h2>Add new</h2>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    {props.user !== null && <BlogForm createNewBlog={addBlog} />}
                </Togglable>
            </div>
        )
    }
    return (
        <>
            <Notification message={errorMessage} type="warning" />
            <Notification message={notification} type="success" />
            {props.user !== null && showBlogForm()}
            {props.user !== null && showBlogs()}
        </>

    )


}
export default BlogDisplay