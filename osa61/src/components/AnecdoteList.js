import React from 'react'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  klik = (anecdote) => async () => {
    const newAnecdote = { id: anecdote.id, content: anecdote.content, votes: anecdote.votes + 1 }
    this.props.anecdoteVote(newAnecdote)
    this.props.notify(`you voted ${anecdote.content}`, 5)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} votes
              <button onClick={this.klik(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  anecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  anecdoteVote, notify
}


const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
