import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '123-123456' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')


    const peopleToShow = filter !== ''
        ? persons.filter(person => person.name.toLowerCase().includes(filter))
        : persons

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some((person) => person.name === newName)) {
            setNewName('')
            return alert(`${newName} is already added to phonebook`)
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                <Filter text='filter shown with' inputValue={filter} inputOnChange={handleFilterChange} />
            </div>
            <h2>Add new</h2>
            <PersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange}
                numberValue={newNumber} onNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <div>
                <Persons peopleToShow={peopleToShow} />
            </div>
        </div>
    )
}

export default App