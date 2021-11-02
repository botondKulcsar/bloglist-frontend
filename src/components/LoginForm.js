import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Container } from '@mui/material'
import usersService from '../services/users'

const LoginForm = ({ handleSubmit }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [showSignup, setShowSignup] = useState(true)

  const handleLogin = (event) => {
    event.preventDefault()
    handleSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    if (name.length < 5 || username.length < 3 || password.length < 5 || password !== rePassword) {
      return alert('Make sure you fill in the form properly!')
    }
    try {
      await usersService.register({ username, password, name })
      setPassword('')
      setRePassword('')
      setName('')
      setShowSignup(!showSignup)
    } catch (error) {
      alert(`An error has occured: ${error.message}`)
    }
  }

  if (showSignup) {
    return (
      <Container>
        <h2>Sign up</h2>

        <form onSubmit={handleSignup}>
          <div>
            <TextField
              type="text"
              label="First and Last name"
              value={name}
              onChange={({ target }) => setName(target.value)}
              name="name"
              sx={{ mb: '1rem' }}
            />
          </div>
          <div>
            <TextField
              id="username"
              type="text"
              label="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name="Username"
              sx={{ mb: '1rem' }}
            />
          </div>
          <div>
            <TextField
              id="password"
              type="password"
              label="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name="Password"
              sx={{ mb: '1rem' }}
            />
          </div>
          <div>
            <TextField
              type="password"
              label="repeat password"
              value={rePassword}
              onChange={({ target }) => setRePassword(target.value)}
              name="Password"
            />
          </div>
          <Button
            sx={{ my: '1rem' }}
            variant="contained"
            id="login-button"
            type="submit"
          >register</Button>
          <p>Already registered? <Button onClick={() => setShowSignup(!showSignup)}>Login</Button></p>
        </form>
      </Container>
    )
  }

  return (
    <Container>
      <h2>Log in</h2>

      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id="username"
            type="text"
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="Username"
            sx={{ mb: '1rem' }}
          />
        </div>
        <div>
          <TextField
            id="password"
            type="password"
            label="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="Password"
          />
        </div>
        <Button
          sx={{ my: '1rem' }}
          variant="contained"
          id="login-button"
          type="submit"
        >login</Button>
        <p>Not yet registered? <Button onClick={() => setShowSignup(!showSignup)}>Sign up</Button></p>
      </form>
    </Container>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm