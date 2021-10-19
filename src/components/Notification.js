import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ color, text }) => {
  const style = {
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
    <p style={style}>{text}</p>
  )
}

Notification.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Notification