import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

class Filter extends React.Component {
  filter = (event) => {
    event.preventDefault()
    const value = event.target.value
    this.props.filterChange(value)
  }

  render() {
    const style = {
      marginBottom: 10
    }
    return (
      <div style={style}>
        filter: <input type="text" onChange={this.filter} />
      </div>
    )
  }
}

const ConnectedFilter = connect(null, { filterChange })(Filter)

export default ConnectedFilter