import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    let { notification } = this.props
    const style = {
      border: notification === '' ? '' : 'solid',
      padding: 10,
      margin: notification === '' ? 31 : 0,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}


const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
