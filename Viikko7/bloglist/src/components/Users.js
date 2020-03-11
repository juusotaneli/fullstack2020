import React from 'react'
import { Link } from 'react-router-dom'

const Users = users => {
  if (!users) {
    return <>loading...</>
  }
  return listUsers(users.users)
}
const listUsers = users => {
  console.log(users)
  return (
    <>
      <h3>USERS</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(u => (
            <tr key={u.id}>
              <td><Link to={`/users/${u.id}`}>{u.username}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
