import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherDisplay = (props) => {

    const [weather, setWeather] = useState('')
    const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: props.country.capital
    }
    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => { setWeather(response.data) })
    },[params])

    console.log(weather)

    if (weather !== '') {

        return (
            <>
                <h3>weather in {props.country.capital}</h3>
                <b>temperature: </b> {weather.current.temperature} Celsius
                <br />
                <img src = {weather.current.weather_icons[0]} alt = "" />
                <br />
                <b>wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
            </>
        )
    }
    return (
        <p>
            loading...
        </p>
    )
}
export default WeatherDisplay


