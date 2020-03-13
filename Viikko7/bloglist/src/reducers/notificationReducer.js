let timeout

const message = null

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
  if (timeout) {
    clearTimeout(timeout)
  }
  return dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      message: {
        content: content,
        style: 'success'
      }
    })
    timeout = setTimeout(() => {
      dispatch(setNotificationToNull())
    }, time)
  }
}
export const setNotificationWhenBlogDeleted = (content, time) => {
  if (timeout) {
    clearTimeout(timeout)
  }
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      message: {
        content: content,
        style: 'warning'
      }
    })
    timeout = setTimeout(() => {
      dispatch(setNotificationToNull())
    }, time)
  }
}

export const setNotificationToNull = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    message: null,
    style: 'warning'
  }
}
export const setNotificationWhenError = (content, time) => {
  if (timeout) {
    clearTimeout(timeout)
  }
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      message: {
        content: content,
        style: 'warning'
      }
    })
    timeout = setTimeout(() => {
      dispatch(setNotificationToNull())
    }, time)
  }
}

export default reducer