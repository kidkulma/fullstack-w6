import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (store = initialState, action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {
    console.log(action.data)
    const newAnecdote = { content: action.data.content, id: action.data.id, votes: 0 }
    console.log([...store, newAnecdote])
    return [...store, newAnecdote]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.create(content)
    dispatch({ type: 'CREATE', data })
  }
}

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.like(anecdote)
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer