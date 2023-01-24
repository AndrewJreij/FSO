import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import numberService from './services/numbers'
import { useEffect } from 'react'
import Person from './components/Person'
import Notification from './components/Notification'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '123-123456' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState()
    let messageCategory = ''

    useEffect(() => {
        numberService
            .getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])

    const peopleToShow = filter !== ''
        ? persons.filter(person => person.name.toLowerCase().includes(filter))
        : persons

    const addPerson = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
        }

        const existingPerson = persons.some((person) => person.name === newName)

        if (existingPerson) {

            const person = persons.find(p => p.name === newName)
            const changedPerson = { ...person, number: newNumber }

            if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
                numberService
                    .update(changedPerson)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))
                    })
            }
        } else {
            numberService
                .create(newPerson)
                .then(response => {
                    setPersons(persons.concat(response))
                })
        }

        setNewName('')
        setNewNumber('')

        setMessage(`Added ${newName}`)
        messageCategory = 'success'
        setTimeout(() => setMessage(''), 5000)
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            numberService
                .deleteEntity(id)
                .then((response) => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(error => {
                    setMessage(`Information of ${name} has already been deleted from server`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    setPersons(persons.filter(person => person.id !== id))
                    messageCategory = 'error'
                })
        }

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
                <Notification className={messageCategory} message={message} />
            </div>
            <div>
                <Filter text='filter shown with' inputValue={filter} inputOnChange={handleFilterChange} />
            </div>
            <h2>Add new</h2>
            <PersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange}
                numberValue={newNumber} onNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <div>
                <ul>
                    {peopleToShow.map(person =>
                        <Person
                            key={person.id}
                            person={person}
                            onDelete={() => deletePerson(person.id, person.name)
                            }
                        />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default App