import React from 'react'
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotificationWhenAnecdoteIsLiked,
  setNotificationToNull,
  newNotification
} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()

  const anecdotesToShow = () => {
      if (props.filter) {
          props.anecdotes.filter(a =>
            a.content.includes(props.filter))
        return props.anecdotes.filter(a =>
            a.content.includes(props.filter))
      }
      return props.anecdotes
  }

  const likeAnecdote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(newNotification(`you voted '${anecdote.content}'`, 5000))
  }

  return (
    <>
      {anecdotesToShow()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => likeAnecdote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}
const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.search.filter,
  }
}
const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList)

export default ConnectedAnecdotes
