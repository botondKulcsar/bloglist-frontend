import React, { useState } from 'react'

// import blogService from '../services/blogs'


const Blog = ({ blog, user = null, likeBlog, deleteBlog }) => {
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
            {blog?.user?.name === user?.name && <button onClick={() => deleteBlog(blog)}>remove</button>}
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