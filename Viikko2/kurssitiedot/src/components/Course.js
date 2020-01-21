import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = (props) => {
    return (
        <>
            <Header course={props.course} />
            <Content parts={props.course.parts} />
        </>


    )
}

export default Course