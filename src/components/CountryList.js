const CountryList = ({ data, onClickShowCountry }) => {

    if (!data) {
        return null;
    }

    return <ul>
        {data.map(country =>
            <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => onClickShowCountry(country)}>
                    Show Country
                </button>
            </li>)}
    </ul>
};

export default CountryList;

