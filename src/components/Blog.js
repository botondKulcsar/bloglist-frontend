import React, { useState } from 'react'
const Blog = ({ blog }) => {
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
    <div style={blogStyle}>
      {
        details
          ? <div>
            {blog.title} {blog.author}
              <button onClick={changeDetails}>hide</button><br />
            {blog.url}<br />
            likes {blog.likes} <button>like</button><br />
            {blog?.user?.name ?? ''}
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