import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Box, TextField, Button } from '@mui/material'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    handleSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create new</h2>
      <Box
        onSubmit={handleCreate}
        component="form"
        sx={{ my: '1rem' }}
      >
        <TextField
          required
          label="Title"
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          sx={{ mr: '1rem' }}
        />
        <TextField
          required
          id='author'
          label='Author'
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          sx={{ mr: '1rem' }}
        />
        <TextField
          required
          label="URL"
          type="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          sx={{ mr: '1rem' }}
        />

        <Button type="submit" variant="contained" size="large">create</Button>

      </Box>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default BlogForm