import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'INIT_USER':
    return action.data
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}
export const initializeUser = user => {
  return async dispatch => {
    await blogService.setToken(user.token)
    dispatch({
      type: 'INIT_USER',
      data: user
    })
  }
}
export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
    data: null
  }
}

export default reducer
