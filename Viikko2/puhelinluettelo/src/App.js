import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '040 7647 466'

        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
            setNewName('')
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchfieldChange = (event) => {
        setNewSearch(event.target.value)
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <form >
                filter by name: <input value={newSearch}
                    onChange={handleSearchfieldChange}
                />
            </form>

            <h3>add new contact</h3>

            <form onSubmit={addPerson}>
                name: <input value={newName}
                    onChange={handleNameChange}
                />
                <br />
                number: <input value={newNumber}
                    onChange={handleNumberChange} />
                <br />
                <button type="submit">add</button>
            </form>

            <h2>Numbers</h2>
            {persons.filter((person => person.name.toLowerCase().includes(newSearch.toLowerCase()))).map((person, i) =>
                <p key={i}>{person.name} {person.number}</p>
            )}
        </div>
    )

}

export default App