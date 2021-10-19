import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [info, setInfo] = useState(null)
  const [color, setColor] = useState('green')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setInfo('login successful')
      setTimeout(() => {
        setInfo(null)
      }, 4000)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setInfo('wrong username or password')
      setColor('red')
      setTimeout(() => {
        setPassword('')
        setInfo(null)
        setColor('green')
      }, 4000)

    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleCreate = async ({ title, author, url }) => {

    try {
      await blogService.create({ title, author, url })
      blogFormRef.current.toggleVisibility()
      setInfo(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setInfo(null)
      }, 4000)

    } catch (error) {
      console.log(error)
      setInfo(error.message)
      setColor('red')
      setTimeout(() => {
        setInfo(null)
        setColor('green')
      }, 4000)
    }

  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      {info && <Notification text={info} color={color} />}
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

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={ blogFormRef }>
        <BlogForm
          handleSubmit={handleCreate}
        />
      </Togglable>
    )
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>

      <h2>Blogs</h2>
      {info && <Notification text={info} color={color} />}
      <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>

      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App