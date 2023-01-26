
const Countries = ({ countriesToShow, showCountry }) => {
    if (!countriesToShow)
        return
    if (countriesToShow.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if (countriesToShow.length < 10 && countriesToShow.length > 1) {
        return (
            <div>
                <ul>
                    {countriesToShow.map(country =>
                        <li key={country.name.common}>
                            {country.name.common}
                        </li>
                    )}
                </ul>
            </div>
        )
    } else if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>

                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(language => <li>{language}</li>)}

                </ul>
                <img src={country.flags.png} alt='swiss flag'></img>
            </div>
        )
    }


}

export default Countries