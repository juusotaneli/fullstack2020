import React from 'react'

const Part = (props) => {
    return (
        <div>
        {props.part.name} {props.part.exercises}
        </div>

    )
}
export default Part