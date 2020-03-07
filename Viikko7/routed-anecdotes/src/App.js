import React, { useState } from 'react'

import { useField } from './hooks'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useRouteMatch
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/anecdotes'>
        anecdotes
      </Link>
      <Link style={padding} to='/create'>
        create new
      </Link>
      <Link style={padding} to='/about'>
        about
      </Link>
    </div>
  )
}
const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const a = anecdotes.find(a => Number(a.id) === Number(id))
  return (
    <div>
      <h2>{a.content}</h2>
      <div>has {a.votes} votes</div> <br />
      <div>
        for more info see <a href={a.info}>{a.info}</a>
      </div>
      <br />
    </div>
  )
}
const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification) {
    return <div style={style}>{notification}</div>
  }
  return <></>
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    {console.log(anecdotes)}
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href='https://courses.helsinki.fi/fi/tkt21009'>
      Full Stack -websovelluskehitys
    </a>
    . See{' '}
    <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = ({ addNew }) => {
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = e => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
    history.push('/anecdotes')
  }
  const doReset = event => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }
  const input = (c) => {
    let {reset, ...rest} = c
    return (
      <input {...rest}/>
    )

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          {input(content)}
        </div>
        <div>
          author
          {input(author)}
        </div>
        <div>
          url for more info
          {input(info)}
        </div>
        <div>
          <button onClick={handleSubmit}>create</button>
          <button onClick={doReset}>reset</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = object => {
    const newAnecdote = {
      id: '',
      content: object.content.value,
      author: object.author.value,
      info: object.info.value,
      votes: object.votes
    }
    newAnecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(newAnecdote))
    setNotification('a new anecdote ' + newAnecdote.content + ' created!')
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = id => anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification} />
        <Switch>
          <Route path='/anecdotes/:id'>
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path='/anecdotes'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route path='/create'>
            <CreateNew addNew={addNew} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
