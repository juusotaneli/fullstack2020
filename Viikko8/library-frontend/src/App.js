
import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import NewUser from './components/NewUser'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification' 



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState('')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message = {notification} />

        <LoginForm
          setToken={setToken}
          setNotification={setNotification}
        />
      </div>
    )
  }
  

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('addUser')}>add user</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Notification message = {notification} />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'} setNotification ={setNotification}
      />
      <NewUser
        show={page === 'addUser'}
      />
      

    </div>
  )
}

export default App