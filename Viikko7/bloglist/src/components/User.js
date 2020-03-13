import React from 'react'
import { useParams } from 'react-router-dom'

const User = users => {
  const id = useParams().id
  const user = users.users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.username}</h3>
      <b>added blogs</b>
      {user.blogs.map(b =>
        <li key={b.id}>{b.title}</li>)}
    </div>
  )

}
export default User