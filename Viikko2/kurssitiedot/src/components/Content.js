import React from 'react'
import Part from './Part'

const Content = (props) => {
    let total = props.parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            {props.parts.map((part) =>
                <Part key={part.id} part={part} />  
            )}
            <b> total of {total} exercises </b> 
        </div>
    )
}
export default Content
