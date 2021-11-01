import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'

const App = () => {

  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
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

  const handleLogin = async ({ username, password }) => {


    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      dispatch(setMessage('login successful', 'green', 4))

      setUser(user)

    } catch (exception) {
      dispatch(setMessage('wrong username or password', 'red', 4))
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleCreate = async ({ title, author, url }) => {
    try {
      const savedBlog = await blogService.create({ title, author, url })
      blogFormRef.current.toggleVisibility()
      setBlogs([...blogs, savedBlog])
      dispatch(setMessage(`a new blog ${title} by ${author} added`, 'green', 4))

    } catch (error) {
      dispatch(setMessage(error.message, 'red', 4))
    }

  }

  const likeBlog = async (id, numLikes) => {
    try {
      await blogService.update(id, { likes: numLikes + 1 })
    } catch (error) {
      dispatch(setMessage(error.message, 'red', 4))
    }
  }

  const loginForm = () => (
    <>
      <Notification />
      <LoginForm
        handleSubmit={handleLogin}
      />
    </>
  )

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
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
      <Notification />
      <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>

      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog}/>
      )}
    </div>
  )
}

export default App