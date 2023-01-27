import axios from 'axios'
import { useState, useEffect } from 'react'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country }) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&&appid=${api_key}`)
            .then(response => setWeather(response.data))
    }, [])

    if (!weather) {
        return null
    }

    const temperature = weather.main['temp']
    const wind = weather.wind['speed']
    const icon = weather.weather[0]['icon']

    return (
        <>
            {console.log(weather)}
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}

            </ul>
            <img src={country.flags.png} alt='swiss flag'></img>
            <h2>Weather</h2>
            <div>
                <div>
                    temperature {(parseInt(temperature) - 273)} Celcius
                </div>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon'></img>
                <div>
                    wind {wind} m/s
                </div>

            </div>
        </>
    )
}

export default Country