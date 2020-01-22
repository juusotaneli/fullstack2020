import React from 'react'

const Person = (props) => (
    <>
        <p> {props.person.name} {props.person.number}</p>
    </>
)
export default Person