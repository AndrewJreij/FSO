import Person from './Person'

const Persons = ({ peopleToShow }) => {
    return (
        <ul>
            {peopleToShow.map(person =>
                <li key={person.name}>
                    <Person name={person.name} number={person.number} />
                </li>
            )}
        </ul>
    )
}

export default Persons