const Person = ({ person, onDelete }) => {
    return (
        <li key={person.key}>
            {person.name} {person.number}
            <button onClick={onDelete}>delete</button>
        </li>
    )
}

export default Person