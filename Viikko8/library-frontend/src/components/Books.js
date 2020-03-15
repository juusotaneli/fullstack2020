import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'


const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 1000
  })
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  if (!books) {
    return <h1>LOADING...</h1>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books