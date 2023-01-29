import axios from 'axios'
import { useState, useEffect } from 'react'

const api_key = process.env.REACT_APP_API_KEY

const kelvinToCelcius = (kelvinTemp) => parseInt(kelvinTemp) - 273;

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const [fetchWeatherError, setFetchWeatherError] = useState();
    const { capitalInfo, capital, area, languages, flags, name } = country;

    useEffect(() => {
        if (!capitalInfo) return;

        const [lat, long] = capitalInfo.latlng;
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&&appid=${api_key}`)
            .then(response => setWeather(response.data))
            .catch(err => setFetchWeatherError(err))
    }, [capitalInfo])

    if (fetchWeatherError) return <div>Error fetching weather</div>

    if (!weather) {
        return null
    }

    const temperature = weather.main.temp;
    const wind = weather.wind.speed;
    const icon = weather.weather[0].icon;

    return (
        <>
            <h1>{name.common}</h1>
            <div>capital {capital}</div>
            <div>area {area}</div>

            <h2>Languages</h2>
            <ul>
                {Object.values(languages).map(language => <li key={language}>{language}</li>)}

            </ul>
            <img src={flags.png} alt='swiss flag'></img>
            <h2>Weather</h2>
            <div>
                <div>
                    temperature {kelvinToCelcius(temperature)} Celcius
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