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

const NewUser = props => {
  const [username, setUsername] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [ addUser ] = useMutation(ADD_USER)

  if (!props.show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()
    console.log('')
    await addUser({  variables: { username, password: "secret", favoriteGenre } })
    setUsername('')
    setFavoriteGenre('')
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
        <div>
          favorite genre
          <input
            value={favoriteGenre}
            onChange={({ target }) => setFavoriteGenre(target.value)}
          />
        </div>
        <button type='submit'>create user</button>
      </form>
    </div>
  )
}

export default NewUser
