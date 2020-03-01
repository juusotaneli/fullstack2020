import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotificationWhenAnecdoteIsLiked,
  setNotificationToNull
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (state.search.filter) {
      return state.anecdotes.filter(a =>
        a.content.includes(state.search.filter)
      )
    }
    return state.anecdotes
  })
  const likeAnecdote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotificationWhenAnecdoteIsLiked(anecdote.content))
    setTimeout(() => {
      dispatch(setNotificationToNull())
    }, 5000)
  }

  return (
    <>
      {anecdotes
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
export default AnecdoteList
