import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'

import {
  setNotificationWhenNewBlogAdded,
  setNotificationWhenError
} from '../reducers/notificationReducer'

import {
  createNewBlog,
  addLikeToABlog,
  deleteABlog,
  handleToggleVisibility
} from '../reducers/blogReducer'

const Blog = ({ blogs, username }) => {
  const dispatch = useDispatch()
  const b = useSelector(state => state.blogs)

  const blogFormRef = React.createRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showBlogs = () => {
    return b
      .sort((b1, b2) => b2.likes - b1.likes)
      .map(b => contentVisibility(b))
  }

  const contentVisibility = blog => {
    if (blog.visible === false) {
      return (
        <div key={blog.id} style={blogStyle}>
          <div id='titleAndAuthor'>
            {blog.title} {blog.author}{' '}
            <button onClick={() => dispatch(handleToggleVisibility(blog))}>
              view
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div key={blog.id} style={blogStyle}>
          <div>
            {blog.title} {blog.author}{' '}
            <button onClick={() => dispatch(handleToggleVisibility(blog))}>
              hide
            </button>
          </div>
          <div id='blogUrl'>{blog.url} </div>
          <div id='NumberOfLikes'>
            likes {blog.likes}{' '}
            <button
              id='likeButton'
              onClick={() => dispatch(addLikeToABlog(blog))}
            >
              like
            </button>{' '}
          </div>
          <div>added by {blog.user.username} </div>
          <div>
            {username === blog.user.username && (
              <button onClick={() => dispatch(deleteABlog(blog))}>
                delete
              </button>
            )}{' '}
            <br />
          </div>
        </div>
      )
    }
  }

  const addBlog = async blogObject => {
    console.log(username)
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createNewBlog(blogObject))
      dispatch(
        setNotificationWhenNewBlogAdded(
          `a new blog ${blogObject.title} by ${blogObject.author} was added`,
          5000
        )
      )
    } catch (exception) {
      console.log(exception)
      dispatch(setNotificationWhenError('something went wrong'), 5000)
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
