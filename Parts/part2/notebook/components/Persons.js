import Person from './Person'

const Persons = ({ peopleToShow, onDelete }) => {
    return (
        <ul>
            {peopleToShow.map(person =>
                <li key={person.id}>
                    <Person name={person.name} number={person.number} id={person.id} onDelete={onDelete(person.id)} />
                </li>
            )}
        </ul>
    )
}

export default Persons