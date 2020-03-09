let timeout

const message = ''

const reducer = (state = message, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.message
  case 'REMOVE_NOTIFICATION':
    return action.message
  case 'LIKE_NOTIFICATION':
    return action.message
  default:
    return state
  }
}

export const setNotificationWhenNewBlogAdded = (content, time) => {
  return {
    type: 'NEW_NOTIFICATION',
    message: {
      content: content,
      style: 'success'
    }
  }
}
export const setNotificationWhenBlogDeleted = content => {
  return {
    type: 'NEW_NOTIFICATION',
    message: {
      content: content,
      style: 'warning'
    }
  }
}

export const setNotificationToNull = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    message: null
  }
}
export const setNotificationWhenError = content => {
  return {
    type: 'NEW_NOTIFICATION',
    message: {
      content: content,
      style: 'warning'
    }
  }
}

export default reducer
