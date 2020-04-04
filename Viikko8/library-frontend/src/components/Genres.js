import React from 'react'

const Genres = ({ books, setFilteredBooks, setGenre }) => {
  let a = new Set()
  books.forEach(b => b.genres.forEach(g => a.add(g)))

  let array = [...a]

  const handleSelectedFilter = g => {
    setGenre(g)
    const booksFiltered = books.filter(b => b.genres.includes(g))
    setFilteredBooks(booksFiltered)
  }
  return array.map(g => (
    <button key={g} onClick={() => handleSelectedFilter(g)}>
      {g}
    </button>
  ))
}
export default Genres
