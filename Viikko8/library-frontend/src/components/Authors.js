import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const UPDATE_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born)  {
      name
      born
    }
  }

`
const Authors = props => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 1000
  })
  const [authors, setAuthors] = useState(null)
  const [name, setName] = useState('')
  const [b, setBorn] = useState('')
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR)

  const submit = async event => {
    event.preventDefault()
    let born = Number(b)
    updateAuthor({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  if (!props.show) {
    return null
  }
  if (authors) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map(a => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
        <h1>SET BIRTHYEAR</h1>
        <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born year
          <input
            value={b}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>UPDATE AUTHOR</button>
      </form>
      </div>

      </div>
    )
  }
  return <h1>LOADING...</h1>
}

export default Authors
