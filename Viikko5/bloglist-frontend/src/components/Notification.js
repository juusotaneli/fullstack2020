import React from 'react'

const Notification = ({ message, type }) => {
    const warning = {
        color: 'red',
        background: 'beige',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'

    }
    const success = {
        color: 'green',
        background: 'beige',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'

    }
    if (message === null) {
        return null
    }

    if (type === 'warning') {
        return (
            <div style={warning}>
                {message}
            </div>
        )
    }else if (type === 'success') {
        return (
            <div style={success}>
                {message}
            </div>
        )
    }
}

export default Notification