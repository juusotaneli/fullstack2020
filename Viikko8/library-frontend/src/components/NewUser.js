import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const ADD_USER = gql`
  mutation createUser($username: String!, $password: String!, $favoriteGenre: String!) {
    createUser(
      username: $username
      password: $password
      favoriteGenre: $favoriteGenre
    ) {
        username
    }
  }
`
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
        value
    }
  }
`
const NewUser = props => {
  const [username, setUsername] = useState('')
  const [ addUser ] = useMutation(ADD_USER)

  if (!props.show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()
    console.log('')
    await addUser({  variables: { username, password: "secret", favoriteGenre: "scifi" } })
    setUsername('')
  }
 
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <button type='submit'>create user</button>
      </form>
    </div>
  )
}

export default NewUser
