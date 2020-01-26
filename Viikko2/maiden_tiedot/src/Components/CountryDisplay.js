import React from 'react'
import WeatherDisplay from './WeatherDisplay'

const CountryDisplay = (props) => {


    return (
        <>
            <h2>{props.countries[0].name}</h2>
            <>capital {props.countries[0].capital}</>
            <br />
            <>population {props.countries[0].population}</>
            <h3>languages</h3>
            <ul>
                {props.countries[0].languages.map((language, i) =>
                    <li key={language.name} >{language.name}</li>
                )}
            </ul>
            <img src={props.countries[0].flag} alt="" height="300px" />

            <WeatherDisplay country={props.countries[0]} />

        </>
    )

}
export default CountryDisplay

