import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

const RECOMMENDED_BOOKS = gql`
  query findBookByGenre($genre: String) {
    booksByGenre(genre: $genre) {
      title
      genres
    }
  }
`

const Recommendations = props => {
  const result = useQuery(RECOMMENDED_BOOKS, {
    variables: { genre: props.user.favoriteGenre },
    refetchQueries: [{ query: RECOMMENDED_BOOKS }]
  })


  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.booksByGenre)
    }
  }, [result])

  if (!props.show) {
    return null
  }
  if (!books) {
    return <h1>LOADING...</h1>
  }
  return <> following books are recommended to you based on your favorite genre '{props.user.favoriteGenre}'
  {books.map(b => <p key = {b.title}>{b.title}</p>)}
  </>

}
export default Recommendations
