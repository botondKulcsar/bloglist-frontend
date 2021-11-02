import React, { useState } from 'react'

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
      <a href={blog.url} rel="noreferrer" target="_blank">{blog.url}</a><br />
      {blog.likes} likes
      <button
        className='like'
        onClick={() => likeBlog(blog.id, blog.likes)}
      >like
      </button><br />
      {blog?.user?.name ? `added by ${blog.user.name}` : ''}<br />
      {blog?.user?.name === user?.name && <button onClick={() => deleteBlog(blog)}>remove</button>}
      <h3>Comments</h3>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button
        onClick={submitComment}
      >add comment</button>
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