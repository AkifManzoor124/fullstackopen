const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':

      state.good++
      return state
    case 'OK':
      state.ok++
      return state
    case 'BAD':
      state.bad++
      return state
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }
  
}

export default counterReducer