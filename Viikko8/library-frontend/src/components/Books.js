import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import Genres from './Genres'

const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      published
      author {
        name
      }
      genres
    }
  }
`

const Books = props => {
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 5000
  })
  const [books, setBooks] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(null)
  const [genre, setGenre] = useState('showing all')

  
  const handleRemoveFilter = () => {
    setFilteredBooks(null)
    setGenre('showing all')
  }
  

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
      <p>showing books in genre <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!filteredBooks &&
            books.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          {filteredBooks &&
            filteredBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Genres books={books} setFilteredBooks={setFilteredBooks} setGenre={setGenre}></Genres>
      <button onClick={() => handleRemoveFilter(setFilteredBooks)}>
        show all
      </button>
    </div>
  )
}



export default Books
