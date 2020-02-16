import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blog, setBlog] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const b = await blogService.create({
        title, author, url,
      })
      blogFormRef.current.toggleVisibility()
      setBlog(b)
      setBlogs(blogs.concat(b))
      console.log(blog)
      setAuthor('')
      setTitle('')
      setUrl('')
      setNotification(`a new blog ${b.title} by ${b.author} was added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log("tää" + blog)
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    window.location.reload(false);
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const showBlogs = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )
  const showLoggedInUser = () => (
    <p>logged in {user.username} <button onClick={handleLogOut}>log out</button></p>
  )
  return (
    <>
      <div>
        <h2>Blogs</h2>
        {user !== null && showLoggedInUser()}
        <Notification message={errorMessage} type="warning" />
        <Notification message={notification} type="success" />
        {user === null && loginForm()}
      </div>
      <div>
        <h2>Add new</h2>
        <Togglable buttonLabel="new blog" ref = {blogFormRef}>
          {user !== null && <BlogForm
            createNewBlog={handleNewBlog}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            title={title}
            author={author}
            url={url}
          />}
        </Togglable>
        {user !== null && showBlogs()}
      </div>

    </>
  )

}

export default App