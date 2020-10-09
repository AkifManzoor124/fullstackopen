import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const reducer = (state = anecdotesAtStart, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const index = state.findIndex( anecdote => anecdote.id === action.data.id )
      const updatedState = [...state]
      updatedState[index] = action.data
      console.log("UPDATED STATE", updatedState)
      return updatedState
    case 'NEW_ANECDOTE':
      return state.concat(action.content)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    anecdote.votes++
    await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: anecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer