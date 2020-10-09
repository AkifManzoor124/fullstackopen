import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from './reducer/userReducer'
import blogsReducer from './reducer/blogReducer'
import usersReducer from './reducer/usersReducer'

const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  blogs: blogsReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store