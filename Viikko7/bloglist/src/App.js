import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import Blog from './components/Blog'
import User from './components/User'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import {
  setNotificationToNull,
  setNotificationWhenError
} from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(u))
    }
  }, [dispatch])

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const u = async () => {
      try {
        const res = await userService.getAll()
        setUsers(res)
      } catch (error) {
        console.log('error')
      }
    }
    u()
  }, [users])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const u = await loginService.login({
        username,
        password
      })
      blogService.setToken(u.token)
      dispatch(initializeUser(u))
      window.localStorage.setItem('loggedInUser', JSON.stringify(u))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotificationWhenError('wrong username or password'))
      setTimeout(() => {
        dispatch(setNotificationToNull())
      }, 5000)
    }
  }

  const handleLogOut = () => {
    dispatch(logoutUser())
    window.localStorage.removeItem('loggedInUser')
    window.location.reload(false)
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='loginButton' type='submit'>
        login
      </button>
    </form>
  )

  const showLoggedInUser = () => (
    <p>
      logged in {user.username} <button onClick={handleLogOut}>log out</button>
    </p>
  )
  return (
    <Router>
      <h2>Blogs</h2>
      <div>
        <Link to='/'>home</Link>
        <Link to='/blogs'>blogs</Link>
        <Link to='/users'>users</Link>
      </div>

      <div>
        {user !== null && showLoggedInUser()}
        <Notification />
        {user === null && loginForm()}
      </div>
      <Switch>
        <Route path='/blogs'>{user !== null && <Blog />}</Route>
        <Route path='/users/:id'>
          {users.length > 0 && <User users={users}/>}
        </Route>
        <Route path='/users'>{users !== null && users.length > 0 && <Users users={users} />}</Route>
        <Route path='/'>
          {user !== null && <p>HELLO WELCOME MY FRIEND</p>}
        </Route>
      </Switch>
    </Router>
  )
}

export default App