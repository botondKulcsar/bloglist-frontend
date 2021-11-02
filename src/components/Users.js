import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import usersService from '../services/users'

import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, Link as MatLink } from '@mui/material'

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    usersService.getAll()
      .then(users => {
        setUsers(users)
      })
  }, [])

  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => <TableRow key={user.id}>
              <TableCell><MatLink component={Link} to={`/users/${user.id}`}>{user.name}</MatLink></TableCell><TableCell>{user.blogs.length}</TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users