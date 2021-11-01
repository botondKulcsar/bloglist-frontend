const SET_MESSAGE = 'SET_MESSAGE'
const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

const clearMessage = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_MESSAGE
        })
    }
}

let timeOut

export const setMessage = (message, color, seconds) => {
    return async (dispatch) => {
        if (timeOut) {
            clearTimeout(timeOut)
        }
        timeOut = setTimeout(() => dispatch(clearMessage()), seconds * 1000)

        dispatch({
            type: SET_MESSAGE,
            data: {
                message,
                color
            }
        })
    }
}

const reducer = (state = { message: '', color: 'green'}, action) => {
    switch(action.type) {
        case SET_MESSAGE:
            return action.data
        case CLEAR_MESSAGE:
            return {
                message: '',
                color: 'green'
            }
        default:
            return state
    }
}

export default reducer