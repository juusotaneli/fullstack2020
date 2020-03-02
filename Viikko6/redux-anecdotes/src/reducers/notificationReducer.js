
import { useState} from 'react'

let t;

const notification = ''

const reducer = (state = notification, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return action.notification
    case 'LIKE_NOTIFICATION':
      return action.notification
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}
export const newNotification = (text, time) => {
  if (t) {
    clearTimeout(t)
  }

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: text
    })
    t = setTimeout(() => {
      dispatch(setNotificationToNull())
    }, time)
  }
}

export const setNotificationWhenNewAnecdoteAdded = content => {
  return {
    type: 'NEW_NOTIFICATION',
    notification: 'a new anecdote ' + content + ' was added'
  }
}
export const setNotificationWhenAnecdoteIsLiked = content => {
  return {
    type: 'LIKE_NOTIFICATION',
    notification: 'you voted ' + content
  }
}
export const setNotificationToNull = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    notification: ''
  }
}
export default reducer
