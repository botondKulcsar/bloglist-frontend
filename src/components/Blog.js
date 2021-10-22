import React, { useState } from 'react'

import blogService from '../services/blogs'


const Blog = ({ blog, user = null, likeBlog }) => {
  const [details, setDetails] = useState(false)

  // console.log(blog?.user?.name)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeDetails = () => setDetails(!details)

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {
        details
          ? <div>
            {blog.title} {blog.author}
            <button onClick={changeDetails}>hide</button><br />
            {blog.url}<br />
            likes {blog.likes}
            <button
              className='like'
              onClick={() => likeBlog(blog.id, blog.likes)}
            >like</button><br />
            {blog?.user?.name ?? ''}<br />
            {blog?.user?.name === user?.name && <button onClick={deleteBlog}>remove</button>}
          </div>
          : <div>
            {blog.title} {blog.author}
            <button
              className='view'
              onClick={changeDetails}>view</button>
          </div>
      }

    </div>
  )
}

export default Blog