import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

const Recommendations = props => {
  const RECOMMENDED_BOOKS = gql`
    query findBookByGenre($genre: String!) {
      booksByGenre(genre: $genre) {
        title
        genres
      }
    }
  `
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

  console.log(books)

  if (!props.show) {
    return null
  }

  if (!books) {
    return <h1>LOADING...</h1>
  }
  return <p>{console.log(books)}</p>
}
export default Recommendations
