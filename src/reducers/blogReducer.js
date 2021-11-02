import blogService from '../services/blogs'

const INIT_BLOGS = 'INIT_BLOGS'
const CREATE_BLOG = 'CREATE_BLOG'
const LIKE_BLOG = 'LIKE_BLOG'
const COMMENT_BLOG = 'COMMENT_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: INIT_BLOGS,
      data: blogs
    })
  }
}

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create({ title, author, url })
    dispatch({
      type: CREATE_BLOG,
      data: savedBlog
    })
  }
}

export const likeBlog = (id, numLikes) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(id, { likes: numLikes + 1 })
    dispatch({
      type: LIKE_BLOG,
      data: likedBlog
    })
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.createComment(id, comment)
    dispatch({
      type: COMMENT_BLOG,
      data: commentedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: DELETE_BLOG,
      data: { id }
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case INIT_BLOGS:
    return action.data
  case CREATE_BLOG:
    return [...state, action.data]
  case LIKE_BLOG:
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case COMMENT_BLOG:
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case DELETE_BLOG:
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export default reducer