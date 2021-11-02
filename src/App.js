import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'

import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'

const App = () => {

  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])


  const handleLogin = async ({ username, password }) => {
    try {
      await dispatch(loginUser({ username, password }))
      dispatch(setMessage('login successful', 'green', 4))
    } catch (exception) {
      dispatch(setMessage('wrong username or password', 'red', 4))
    }

  }

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setMessage('logout successful', 'green', 4))
  }

  const handleCreate = async ({ title, author, url }) => {
    try {
      await dispatch(createBlog({ title, author, url }))
      blogFormRef.current.toggleVisibility()
      dispatch(setMessage(`a new blog ${title} by ${author} added`, 'green', 4))
    } catch (error) {
      dispatch(setMessage(error.message, 'red', 4))
    }
  }

  const like = async (id, numLikes) => {
    try {
      await dispatch(likeBlog(id, numLikes))
      dispatch(setMessage(`blog with id=${id} has just been liked`, 'green', 4))
    } catch (error) {
      dispatch(setMessage(error.message, 'red', 4))
    }
  }

  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(blog.id))
        dispatch(setMessage(`blog: ${blog.title} has just been deleted`, 'green', 4))
      } catch (error) {
        dispatch(setMessage(error.message, 'red', 4))
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

      <Switch>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          {blogForm()}

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} likeBlog={like} deleteBlog={remove} />
          )}
        </Route>
      </Switch>


    </div>
  )
}

export default App