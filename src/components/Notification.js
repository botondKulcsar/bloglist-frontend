import React from 'react'
// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {

  const { message, color } = useSelector(state => state.message)
  const style = {
    display: message ? 'block' : 'none',
    background: 'lightgray',
    borderStyle: 'solid',
    borderColor: color,
    borderRadius: 5,
    borderWidth:3,
    color: color,
    fontSize: '1.2em',
    padding: 10
  }
  return (
    <p style={style}>{message}</p>
  )
}

// Notification.propTypes = {
//   color: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired
// }

export default Notification