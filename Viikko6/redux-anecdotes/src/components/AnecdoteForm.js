import React from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotificationWhenNewAnecdoteAdded,
  setNotificationToNull,
  newNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createNewAnecdote(content)
    dispatch(newNotification(`new anecdote '${content}'`, 5000))
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default connect(null, { createNewAnecdote })(AnecdoteForm)
