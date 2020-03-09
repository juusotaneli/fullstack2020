import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import {
  setNotificationWhenNewBlogAdded,
  setNotificationToNull,
  setNotificationWhenError,
  setNotificationWhenBlogDeleted
} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blogs, username, setBlogs }) => {
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showBlogs = () => {
    return blogs
      .sort((b1, b2) => b2.likes - b1.likes)
      .map(b => contentVisibility(b))
  }
  const addLike = async blog => {
    let returnedBlog = await blogService.update(
      {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        visible: blog.visible
      },
      blog.id
    )
    setBlogs(blogs.map(b => (b.id !== blog.id ? b : returnedBlog)))
  }

  const contentVisibility = blog => {
    if (blog.visible === false) {
      return (
        <div key={blog.id} style={blogStyle}>
          <div id='titleAndAuthor'>
            {blog.title} {blog.author}{' '}
            <button onClick={() => handleToggleVisibility(blog)}>view</button>
          </div>
        </div>
      )
    } else {
      return (
        <div key={blog.id} style={blogStyle}>
          <div>
            {blog.title} {blog.author}{' '}
            <button onClick={() => handleToggleVisibility(blog)}>hide</button>
          </div>
          <div id='blogUrl'>{blog.url} </div>
          <div id='NumberOfLikes'>
            likes {blog.likes}{' '}
            <button id='likeButton' onClick={() => addLike(blog)}>
              like
            </button>{' '}
          </div>

          <div>added by {blog.user.username} </div>
          <div>
            {username === blog.user.username && (
              <button onClick={() => deleteBlog(blog)}>delete</button>
            )}{' '}
            <br />
          </div>
        </div>
      )
    }
  }
  const handleToggleVisibility = async blog => {
    console.log(blog)
    let returnedBlog = await blogService.update(
      {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        visible: !blog.visible
      },
      blog.id
    )
    setBlogs(blogs.map(b => (b.id !== blog.id ? b : returnedBlog)))
  }
  const addBlog = async blogObject => {
    console.log(username)
    blogFormRef.current.toggleVisibility()
    try {
      let b = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        visible: false
      })
      setBlogs(blogs.concat(b))
      dispatch(
        setNotificationWhenNewBlogAdded(
          `a new blog ${b.title} by ${b.author} was added`, 10000
        )
      )
    } catch (exception) {
      console.log(blogObject)

      dispatch(setNotificationWhenError('something went wrong'))
      setTimeout(() => {
        dispatch(setNotificationToNull())
      }, 5000)
    }
  }
  const deleteBlog = async blogObject => {
    let result = window.confirm('Are you sure you want to delete this blog?')
    if (result) {
      try {
        await blogService.remove(blogObject.id)
        dispatch(
          setNotificationWhenBlogDeleted(
            `a blog ${blogObject.title} by ${blogObject.author} was deleted`
          )
        )
        setBlogs(blogs.filter(b => b.id !== blogObject.id))
        setTimeout(() => {
          dispatch(setNotificationToNull())
        }, 5000)
      } catch (exception) {
        console.log(blogObject)
        dispatch(setNotificationWhenError('something went wrong'))
        setTimeout(() => {
          dispatch(setNotificationToNull())
        }, 5000)
      }
    }
  }
  const showBlogForm = () => {
    return (
      <div>
        <h2>Add new</h2>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          {username !== null && <BlogForm createNewBlog={addBlog} />}
        </Togglable>
      </div>
    )
  }
  if (blogs) {
    return (
      <>
        {username !== null && showBlogForm()}
        {username !== null && showBlogs()}
      </>
    )
  }
  return <p>loading...</p>
}

export default Blog
