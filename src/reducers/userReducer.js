import blogService from '../services/blogs'
import userService from '../services/login'

const SET_INITIAL = 'SET_INITIAL'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: SET_INITIAL,
        user
      })
    }
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await userService.login(credentials)
    if (user) {
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: LOGIN,
        user
      })
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch({
      type: LOGOUT
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case SET_INITIAL:
    return action.user
  case LOGIN:
    return action.user
  case LOGOUT:
    return null
  default:
    return state
  }
}

export default reducer