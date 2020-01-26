import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchForm from './Components/SearchForm'
import Filter from './Components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => { setCountries(response.data) })
  }, [])

  const handleSearchfieldChange = (event) => {
    event.preventDefault(); 
    setNewSearch(event.target.value)
  }

  return (
    <>
    <SearchForm handleSearchfieldChange={handleSearchfieldChange} />
    <Filter countries={countries} newSearch={newSearch} setNewSearch = {setNewSearch}/>
    </>
  )

}

export default App
