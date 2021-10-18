import React from 'react'

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

export default Notification