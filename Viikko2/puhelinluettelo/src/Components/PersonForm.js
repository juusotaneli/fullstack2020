import React from 'react'

const PersonForm = (props) => (
    <form onSubmit={props.addPerson}>
        name: <input value={props.newName}
            onChange={props.handleNameChange}
        />
        <br />
        number: <input value={props.newNumber}
            onChange={props.handleNumberChange} />
        <br />
        <button type="submit">add</button>
    </form>
)
export default PersonForm