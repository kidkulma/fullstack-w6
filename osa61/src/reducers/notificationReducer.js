const defaultNotification = 'Welcome!'

const notificationReducer = (store = defaultNotification, action) => {
  switch (action.type) {
    case 'REMOVE':
      return ''
    case 'MESSAGE':
      return action.content
    default:
      return store
  }
}

export const notify = (content, time) => {
  return async (dispatch) => {
    dispatch(message(content))
    setTimeout(() => dispatch(remove()), time * 1000)
  }
}

const message = (content) => {
  return {
    type: 'MESSAGE',
    content
  }
}

const remove = () => {
  return {
    type: 'REMOVE'
  }
}

export default notificationReducer