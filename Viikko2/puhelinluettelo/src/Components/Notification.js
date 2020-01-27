import React from 'react'

const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'pink',
        background: 'beige',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'

    }
    if (message === '') {
        return null
    }
    return (
        <> {console.log(message)} 
        <div style={notificationStyle}>
            {message}
        </div>
        </>
    )

}
export default Notification