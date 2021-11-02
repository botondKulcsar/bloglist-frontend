import React from 'react'

// import blogService from '../services/blogs'

export const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user = null, likeBlog, deleteBlog }) => {
  // const [details, setDetails] = useState(false)

  // console.log(blog?.user?.name)


  // const changeDetails = () => setDetails(!details)

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



    </div>
  )
}

export default Blog