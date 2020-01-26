import React from 'react'

const SearchForm = (props) => (
    <p>
        find countries <input onChange={props.handleSearchfieldChange} />
    </p>
)
export default SearchForm