import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
  query {
    allBooks {
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
  const [genres, setGenres] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(null)

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
      <Cacca books={books} setFilteredBooks={setFilteredBooks}></Cacca>
      <button onClick={() => handleRemoveFilter(setFilteredBooks)}>
        show all
      </button>
    </div>
  )
}
const handleSelectedFilter = (books, setFilteredBooks, g) => {
  console.log('joo')
  if (books.length > 0) {
    const booksFiltered = books.filter(b => b.genres.includes(g))
    setFilteredBooks(booksFiltered)
  }
}
const handleRemoveFilter = setFilteredBooks => {
  setFilteredBooks(null)
}

const Cacca = ({ books }, { setFilteredBooks }) => {
  let a = new Set()
  books.forEach(b => b.genres.forEach(g => a.add(g)))

  let array = [...a]
  return array.map(g => (
    <button
      key={g}
      onClick={() => handleSelectedFilter(books, setFilteredBooks, g)}
    >
      {g}
    </button>
  ))
}

export default Books
