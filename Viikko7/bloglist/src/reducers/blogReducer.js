import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}
export const voteBlog = blog => {
  const changedBlog = {
    ...blog,
    votes: blog.likes + 1
  }
  return async dispatch => {
    const a = await blogService.update(blog.id, changedBlog)
    console.log('TÄMÄ' + a.content)
    dispatch({
      type: 'ADD_LIKE',
      data: a
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

export default reducer
