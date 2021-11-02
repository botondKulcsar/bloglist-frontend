import React, { useState, useEffect } from 'react'
import usersService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    usersService.getAll()
      .then(users => {
        setUsers(users)
        console.log(users)
      })
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users