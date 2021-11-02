import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import usersService from '../services/users'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  useEffect(() => {
    usersService.getOne(id)
      .then(foundUser => {
        setUser(foundUser)
      })
  }, [])

  return user ? (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>{user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}</ul>
    </div>
  ) : null
}

export default User