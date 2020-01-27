import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import contactService from './services/contacts'


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        console.log('effect')
        contactService
            .getAll()
            .then(initialContacts => {
                setPersons(initialContacts)
            })
    }, [])
    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(person => person.name === newName)) {
            let result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (result) {
                const personObject = {
                    name: newName,
                    number: newNumber
                }

                contactService
                    .update(persons.find(person => person.name === newName).id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))

                    })
            }
            setNewName('')
            setNewNumber('')

        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            contactService
                .create(personObject)
                .then(returnedContact => {
                    setPersons(persons.concat(returnedContact))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }
    const removePerson = (event) => {
        event.preventDefault()
        let result = window.confirm(`are you sure you want to delete beloved '${persons.find(p => p.id === Number(event.target.value)).name}' from your contacts?`)
        if (result) {
            event.preventDefault()
            setPersons(persons.filter(p => p.id !== Number(event.target.value)))
            contactService.remove(event.target.value)
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
            <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Filter persons={persons} newSearch={newSearch} removePerson={removePerson} />
        </div>
    )

}

export default App