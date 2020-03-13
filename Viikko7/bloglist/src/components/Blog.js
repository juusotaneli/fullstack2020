import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLikeToABlog } from '../reducers/blogReducer'

const Blog = blogs => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = blogs.blogs.find(b => b.id === id)

  return (
    <div>
      <h1>{blog.author}</h1>
      <a href={blog.url}>{blog.url} </a>
      <div>
        <span>{blog.likes} likes</span>
        <span>
          <button
            id='likeButton'
            onClick={() => dispatch(addLikeToABlog(blog))} >
            like
          </button>{' '}
        </span>
      </div>
    </div>
  )
}
export default Blog
