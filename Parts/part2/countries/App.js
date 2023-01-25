import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

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
    }

    const countriesToShow = filter !== ''
        ? countries.filter(country => country.name.common.toLowerCase().includes(filter))
        : null

    return (
        <div>
            <div>
                <input onChange={handleFilterChange}></input>
            </div>
            <div>
                <Countries countriesToShow={countriesToShow} />

            </div>
        </div>
    )
}

export default App