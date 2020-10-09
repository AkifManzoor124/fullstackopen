import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Weather from './Weather';


const Country = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
    console.log('API_KEY', api_key)
    const [weather, setWeather] = useState({})


    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    console.log(props.country.languages)

    return (
        <div>
            <h2>{props.name}</h2>
            <p>Capital: {props.country.capital}</p>
            <p>Population: {props.country.population}</p>

            <h4>Languages</h4>
            <ul>
                {props.country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={props.flag}></img>
            <br></br>

            <Weather weather={weather} details={props.details} />
        </div>
    )


}

export default Country