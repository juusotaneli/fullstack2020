import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
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
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState('')

  const linkStyle = {
    paddingRight: 5,
  }

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
    <Container>
      <Router>
        <h2>Blogs</h2>
        <div>
          <Link style={linkStyle} to='/'>home</Link>
          <Link style={linkStyle} to='/blogs'>blogs</Link>
          <Link style={linkStyle} to='/users'>users</Link>
          {user !== null && showLoggedInUser()}
        </div>
        <div>
          <Notification />
          {user === null && loginForm()}
        </div>
        <Switch>
          <Route path='/blogs/:id'>
            {user !== null && <Blog blogs={blogs} />}
          </Route>
          <Route path='/blogs'>{user !== null && <Blogs />}</Route>
          <Route path='/users/:id'>
            {users.length > 0 && <User users={users} />}
          </Route>
          <Route path='/users'>
            {user && users.length > 0 && <Users users={users} />}
          </Route>
          <Route path='/'>
            {user !== null && <p>HELLO WELCOME MY FRIEND</p>}
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App
