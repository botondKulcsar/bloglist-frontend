import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, payload) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.patch(`${baseUrl}/${id}`, payload, config)
  return response.data
}

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.error(error)
    return error.message
  }
}

export default { getAll, setToken, create, update, remove, createComment }