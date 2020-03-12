import userService from '../services/users'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  let id = ''
  let userToChange = ''
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  case 'ADD_BLOG':
    userToChange = action.users.find(u => u.username === action.user.username)
    userToChange.blogs = userToChange.blogs.concat(action.blog)
    return action.users.map(u => (u.id !== id ? u : userToChange))
  case 'DEL_BLOG':
    userToChange = action.users.find(u => u.username === action.user.username)
    userToChange.blogs = userToChange.blogs.filter(b => b.id !== action.blog.id)
    return action.users.map(u => (u.username !== action.user.username ? u : userToChange))
  default:
    return state
  }
}
export const initializeUsers = () => {
  return async dispatch => {
    const response = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: response
    })
  }
}
export const addBlogToAUser = (user, blog, users) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_BLOG',
      users: users,
      user: user,
      blog: blog
    })
  }
}
export const delBlogFromAUser = (user, blog, users) => {
  return async dispatch => {
    await dispatch({
      type: 'DEL_BLOG',
      users: users,
      user: user,
      blog: blog
    })
  }
}

export default reducer
