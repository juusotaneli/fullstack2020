
import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, gql, useSubscription} from '@apollo/client'
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
export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      published
      author {
        name
      }
      genres
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const App = () => {
  
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const result = useQuery(CURRENT_USER, {
    pollInterval: 500
  })
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState('')
  const client = useApolloClient()


  useEffect(() => {
    if (result.data) {
      setUser(result.data)
    }
  }, [result.data]) // eslint-disable-line

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
      window.alert(addedBook.title + ' was added');
    }   
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  

  const logout = () => {
    setUser(null)
    setToken(null)
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
  if (!user) {
    return (
      <p>loading...</p>
    )
  }
 
  return (
    <div>
      {console.log("this " +token)}
      {console.log(user)}
      {user.me && <p>logged in as {user.me.username} </p>}
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
      {user.me && <Recommendations show={page === 'recommendations'} user={user.me} />}

      <NewBook show={page === 'add'} setNotification={setNotification} updateCacheWith={updateCacheWith} setPage={setPage}/>
      <NewUser show={page === 'addUser'} />
    </div>
  )
}

export default App
