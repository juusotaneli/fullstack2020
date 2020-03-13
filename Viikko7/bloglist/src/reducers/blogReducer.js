import blogService from '../services/blogs'
import {
  setNotificationWhenError,
  setNotificationWhenBlogDeleted
} from '../reducers/notificationReducer'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  let id = ''
  let blogToChange = ''
  let changedBlog = ''
  if (action.data) {
    id = action.data.id
    blogToChange = state.find(b => b.id === id)
    changedBlog = ''
  }

  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.data.id)
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_LIKE':
    changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(b => (b.id !== id ? b : changedBlog))
  case 'CHANGE_VISIBILITY':
    id = action.data.id
    blogToChange = state.find(b => b.id === id)
    changedBlog = {
      ...blogToChange,
      visible: !blogToChange.visible
    }
    return state.map(b => (b.id !== id ? b : changedBlog))
  default:
    return state
  }
}
export const addLikeToABlog = blog => {
  return async dispatch => {
    const b = await blogService.update(
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
    dispatch({
      type: 'ADD_LIKE',
      data: b
    })
  }
}

export const createNewBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create({
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      visible: false
    })
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}
export const deleteABlog = b => {
  let result = window.confirm('Are you sure you want to delete this blog?')
  if (result) {
    return async dispatch => {
      try {
        await blogService.remove(b.id)
        dispatch({
          type: 'DELETE_BLOG',
          data: b
        })
        dispatch(
          setNotificationWhenBlogDeleted(
            `a blog ${b.title} by ${b.author} was deleted`,
            5000
          )
        )
      } catch (exception) {
        dispatch(setNotificationWhenError('something went wrong', 5000))
      }
    }
  } else {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    }
  }
}

export const handleToggleVisibility = b => {
  return async dispatch => {
    const blog = await blogService.update(
      {
        user: b.user.id,
        title: b.title,
        author: b.author,
        url: b.url,
        likes: b.likes,
        visible: !b.visible
      },
      b.id
    )
    dispatch({
      type: 'CHANGE_VISIBILITY',
      data: blog
    })
  }
}

export default reducer