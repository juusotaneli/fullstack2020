import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'


const Notification = () => {
  const message = useSelector(state => state.message)

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
  if (message === null) {
    return null
  }

  if (message.style === 'warning') {
    return (
      <Alert severity="warning">
        {message.content}
      </Alert>
    )
  }else if (message.style === 'success') {
    return (
      <Alert severity="success">
        {message.content}
      </Alert>
    )
  }
}

export default Notification