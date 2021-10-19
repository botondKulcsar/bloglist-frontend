import React, { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        handleSubmit({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Log in to application</h2>
            
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        name="Username"
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        name="Password"
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm