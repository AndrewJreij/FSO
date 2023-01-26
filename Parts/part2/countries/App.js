import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [countriesToShow, setCountriesToShow] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response =>
                setCountries(response.data))
    }, [])

    if (!countries) {
        return null
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)

        if (event.target.value !== '') {
            setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(filter)))
        } else {
            setCountriesToShow([])
        }
    }

    const showCountry = (name) => {
        setCountriesToShow(countries.filter(country => country.name.common === name))
        setFilter('')
    }

    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        return (
            <div>
                <div>
                    <input onChange={handleFilterChange}></input>
                </div>
                <Country country={country} />
            </div >
        )
    }

    return (
        <div>
            <div>
                <input onChange={handleFilterChange}></input>
            </div>
            <div>
                {countriesToShow.length > 10
                    ? <p>Too many matches, specify another filter</p>
                    : <ul>
                        {
                            countriesToShow.map(country =>
                                <li key={country.name.common}>
                                    {country.name.common}
                                    <button onClick={() => showCountry(country.name.common)}>Show Country</button>
                                </li>
                            )
                        }
                    </ul>
                }
            </div>
        </div>
    )
}

export default App