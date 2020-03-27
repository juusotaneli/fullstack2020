import React, { useState, useEffect } from 'react'
import { useApolloClient, gql, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import NewUser from './components/NewUser'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommendations from './components/Recommendations'

const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const App = () => {
  
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const client = useApolloClient()
  const userQueryResult = useQuery(CURRENT_USER, {
    options: { fetchPolicy: 'no-cache' },
  })

  useEffect(() => {
    if (userQueryResult.data) {
      console.log(userQueryResult.data)
    }
  },[userQueryResult])

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()

  }
  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={notification} />
        <LoginForm
          setToken={setToken}
          setNotification={setNotification}
        />
      </div>
    )
  }

  if (!token) {
    return (
      <p>loading...</p>
    )
  }
 
  return (
    <div>
      {console.log(token)}
      {user && <p>logged in as {user.username} </p>}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={() => setPage('addUser')}>add user</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Notification message={notification} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />
      {user && <Recommendations show={page === 'recommendations'} user={user} />}

      <NewBook show={page === 'add'} setNotification={setNotification} />
      <NewUser show={page === 'addUser'} />
    </div>
  )
}

export default App
