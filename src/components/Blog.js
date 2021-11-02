import React, { useState } from 'react'

import { Link, Button, TextField } from '@mui/material'

export const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user = null, likeBlog, deleteBlog, addComment }) => {

  const [comment, setComment] = useState('')

  const submitComment = () => {
    if (!comment) {
      return alert('Please enter a valid comment!')
    }
    addComment(blog.id, comment)
    setComment('')
  }

  if (!blog) return null

  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>
      <Link href={blog.url} rel="noreferrer" target="_blank">{blog.url}</Link><br />
      {blog.likes} likes
      <Button
        variant="outlined"
        size="small"
        sx={{ m: '1rem' }}
        className='like'
        onClick={() => likeBlog(blog.id, blog.likes)}
      >like
      </Button><br />
      {blog?.user?.name ? `added by ${blog.user.name}` : ''}<br />
      {blog?.user?.name === user?.name && <Button onClick={() => deleteBlog(blog)}>remove</Button>}
      <h3>Comments</h3>
      <TextField
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Button
        sx={{ m: '1rem' }}
        variant="contained"
        size="large"
        onClick={submitComment}
      >add comment</Button>
      {blog.comments.length
        ? <div>
          <ul>{blog.comments.map((comment) => <li key={comment}>{comment}</li>)}</ul>
        </div>
        : null
      }
    </div>
  )
}

export default Blog