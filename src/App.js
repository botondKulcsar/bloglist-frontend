import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'

const App = () => {

  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)

  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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

  const handleCreate = ({ title, author, url }) => {
    try {

      dispatch(createBlog({ title, author, url }))
      blogFormRef.current.toggleVisibility()
      dispatch(setMessage(`a new blog ${title} by ${author} added`, 'green', 4))

    } catch (error) {
      dispatch(setMessage(error.message, 'red', 4))
    }

  }

  const like = (id, numLikes) => {
    try {
      dispatch(likeBlog(id, numLikes))
    } catch (error) {
      dispatch(setMessage(error.message, 'red', 4))
    }
  }

  const remove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (error) {
        console.error(error)
      }
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
        <Blog key={blog.id} blog={blog} user={user} likeBlog={like} deleteBlog={remove} />
      )}
    </div>
  )
}

export default App