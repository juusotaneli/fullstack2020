import React from 'react'

const Person = (props) => (
    <>
        <p> {props.person.name} {props.person.number} <button onClick={props.removePerson} value={props.person.id}>delete</button></p>
    </>
)
export default Person