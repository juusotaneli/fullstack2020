import React from 'react'
import Person from './Person'

const Filter = (props) => (
    <>
        {props.persons.filter((person => person.name.toLowerCase().includes(props.newSearch.toLowerCase()))).map((person, i) =>

            <Person key={person.name} person={person} removePerson = {props.removePerson}/>

        )}
    </>
)
export default Filter