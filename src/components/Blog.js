import React, { useState } from 'react'

import blogService from '../services/blogs'


const Blog = ({ blog, user }) => {
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

  const likeBlog = async () => {
    try {
      await blogService.update(blog.id, { likes: blog.likes + 1 })
    } catch (error) {
      console.error(error)
    }
    
  }

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
    <div style={blogStyle}>
      {
        details
          ? <div>
            {blog.title} {blog.author}
              <button onClick={changeDetails}>hide</button><br />
            {blog.url}<br />
            likes {blog.likes} <button onClick={likeBlog}>like</button><br />
            {blog?.user?.name ?? ''}<br />
            {blog?.user?.name === user.name && <button onClick={deleteBlog}>remove</button>}
          </div>
          : <div>
            {blog.title} {blog.author}
            <button onClick={changeDetails}>view</button>
          </div>
      }

    </div>
  )
}

export default Blog