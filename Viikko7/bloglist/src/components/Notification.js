import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state)

  console.log(message)

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
  if (message.content === null) {
    return null
  }

  if (message.style === 'warning') {
    return (
      <div style={warning} className = 'error'>
        {message.content}
      </div>
    )
  }else if (message.style === 'success') {
    return (
      <div style={success}>
        {message.content}
      </div>
    )
  }
}

export default Notification