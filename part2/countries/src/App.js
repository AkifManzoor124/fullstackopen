import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import './App.css';

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [click, setClicked] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const showCountries = countries.filter(country => country.name.includes(filter))

  console.log(showCountries)

  if (showCountries.length === 1) {
    const country = showCountries[0]
    console.log(country)
    return <Country country={country} />
  }

  if (click !== '') {
    return <Country country={click} />
  }

  const filterCountries = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (country) => {
    setClicked(country)
  }


  return (
    <div>
      <form>
        find countries: <input onChange={filterCountries} />
      </form>
      <div>
        {showCountries.map((country, i) =>
          <li key={i}>
            {country.name}
            <button onClick={() => showCountry(country)}>show</button>
          </li>)}
      </div>
    </div>
  )
}

export default App;
