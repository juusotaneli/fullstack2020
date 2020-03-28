import React, { useState, useEffect } from 'react'
import { useMutation, gql, useQuery } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const LoginForm = ({ setToken, setNotification, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setNotification(error.graphQLErrors[0].message)
      setTimeout(() => {
        setNotification('')
      }, 3000)
    },
    options: { fetchPolicy: 'no-cache' }
  })
  const userQueryResult = useQuery(CURRENT_USER, {
    options: { fetchPolicy: 'no-cache' },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setUser(userQueryResult)
      setToken(token)
      localStorage.setItem('token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async event => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm