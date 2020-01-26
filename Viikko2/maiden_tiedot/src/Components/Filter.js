import React from 'react'
import CountryDisplay from './CountryDisplay'


const Filter = (props) => {

    const selectCountry = (event) => {
        event.preventDefault();
        props.setNewSearch(event.target.value)

    }
    if (props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase())).length <= 10 && props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase())).length > 1) {
        return (
            <>
                {props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase())).map((country, i) =>
                    <p key={i} >{country.name}
                        <button onClick={selectCountry} value={country.name}>choose</button>
                    </p>
                )}
            </>
        )
    }
    else if (props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase())).length === 1) {
        return (
            <CountryDisplay countries={props.countries.filter(country => country.name.toLowerCase().includes(props.newSearch.toLowerCase()))} />
        )

    }
    return (
        <p>
            please specify your search criteria
        </p>

    )

}

export default Filter