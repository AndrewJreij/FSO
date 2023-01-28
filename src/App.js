import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountryList from './components/CountryList';

const MAX_COUNTRY_RESULTS = 10;
const ResultsWarning = () => <p>Too many matches, specify another filter</p>;

const App = () => {
    const [countries, setCountries] = useState();
    const [filter, setFilter] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState();
    const [fetchCountriesError, setFetchCountriesError] = useState();

    const isCountryListVisible = filteredCountries.length < MAX_COUNTRY_RESULTS;

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(({ data }) => setCountries(data))
            .catch(err => setFetchCountriesError(err));
    }, [])

    useEffect(() => {
        if (filter === '') return setFilteredCountries([]);

        setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(filter)));
    }, [filter, countries])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleShowCountryClicked = (country) => {
        setSelectedCountry(country);
    }

    if (!countries) {
        return <div>Loading</div>
    }

    if (fetchCountriesError)
        return <div>Error fetching countries</div>

    return (
        <div>
            <div>
                <input onChange={handleFilterChange} value={filter}></input>
            </div>
            <div>
                {isCountryListVisible
                    ? <CountryList data={filteredCountries} onClickShowCountry={handleShowCountryClicked} />
                    : <ResultsWarning />
                }
                {selectedCountry && <Country country={selectedCountry} />}
            </div>
        </div>
    )
}

export default App