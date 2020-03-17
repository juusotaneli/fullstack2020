import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'
import Notification from './Notification'

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
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`
const Authors = props => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 5000
  })
  const [authors, setAuthors] = useState(null)
  const [name, setName] = useState('')
  const [b, setBorn] = useState('')
  const [options, setOptions] = useState([''])
  const [updateAuthor] = useMutation(UPDATE_AUTHOR)
  const [notification, setNotification] = useState('')

  const submit = async event => {
    event.preventDefault()
    let born = Number(b)
    try {
      await updateAuthor({ variables: { name, born } })
    } catch (error) {
      setNotification(error.message)
      setTimeout(() => {
        setNotification('')
      }, 3000)
    }
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
      setOptions(
        result.data.allAuthors.map(a => ({ value: a.name, label: a.name }))
      )
    }
  }, [result])

  if (!props.show) {
    return null
  }
  console.log(result)
  if (authors) {
    return (
      <div>
        <h2>authors</h2>
        <Notification message={notification} />
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
              select name
              <Select
                value={{ value: name, label: name }}
                options={options}
                onChange={value => setName(value.value)}
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
