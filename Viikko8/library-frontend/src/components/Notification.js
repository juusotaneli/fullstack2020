import React  from 'react'

const Notification = ( { message }) => {
    const warningStyle = {
        color: 'red'
    }
    return (
        <p style={warningStyle}>{message}</p>
    )
}
export default Notification