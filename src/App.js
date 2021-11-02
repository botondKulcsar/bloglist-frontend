import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'

import './App.css'

import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog, commentBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'

import { Container, Table, TableBody, TableRow, TableCell, Link as MatLink, TableHead, AppBar, Toolbar, Button } from '@mui/material'

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

  const addCommentToBlog = (id, comment) => {
    dispatch(commentBlog(id, comment))
  }

  const match = useRouteMatch('/blogs/:id')

  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  const loginForm = () => (
    <Container>
      <Notification />
      <LoginForm
        handleSubmit={handleLogin}
      />
    </Container>
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
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to='/blogs'>blogs</Button>
          <Button color="inherit" component={Link} to='/users'>users</Button>
          <span>{user.name} logged-in </span>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <h2>blog app</h2>
        <Notification />

        <Switch>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/blogs/:id'>
            <Blog blog={blog} user={user} likeBlog={like} deleteBlog={remove} addComment={addCommentToBlog} />
          </Route>
          <Route path='/blogs'>
            {blogForm()}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map(blog =>
                  <TableRow key={blog.id}>
                    <TableCell><MatLink component={Link} to={`/blogs/${blog.id}`} >{blog.title}</MatLink></TableCell><TableCell> {blog.author}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Route>
        </Switch>
      </Container>
    </>
  )
}

export default App