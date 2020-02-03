import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import contactService from './services/contacts'


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [message, setMessage] = useState('')


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
                        setMessage(`${newName}'s phone number was updated!!`)
                        setTimeout(() => {
                            setMessage('')
                        }, 5000)
                    })
                    .catch(returnedPerson => {
                        setPersons(persons.filter(person => person.name !== newName))
                        setMessage(`contact '${newName}' has already been removed :(`)
                        setNewName('')
                        setNewNumber('')
                        setTimeout(() => {
                            setMessage('')
                        }, 5000)

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
                    setMessage(`new contact '${newName}' was added`)
                    setTimeout(() => {
                        setMessage('')
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    setMessage(error.response.data.error)
                    setTimeout(() => {
                        setMessage('')
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                }
                )
        }
    }
    const removePerson = (event) => {
        event.preventDefault()
        let person = persons.find(p => p.id === event.target.value)
        let result = window.confirm(`are you sure you want to delete beloved '${person.name}' from your contacts?`)
        if (result) {
            setPersons(persons.filter(p => p.id !== event.target.value))
            contactService
                .remove(event.target.value)
                .then(r => {
                    setMessage(`contact '${person.name}' was removed :(`)
                    setTimeout(() => {
                        setMessage('')
                    }, 5000)
                })
                .catch(error => {
                    setMessage(`contact '${person.name}' has already been removed :(`)
                })
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
            <Notification message={message} />
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