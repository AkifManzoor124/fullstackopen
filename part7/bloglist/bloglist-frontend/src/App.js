import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Blog from './components/Blog'
import User from './components/User'

import { initializeBlogs } from './reducer/blogReducer'
import { initializeUsers } from './reducer/usersReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"


const Menu = () => {
  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/blogs">Blogs </Link>
      <Link to="/users">Users </Link>
      <Login></Login>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <Router>

      <div>
        <Notification />
        <Menu></Menu>
      </div>

      <Switch>
        <Route path="/users/:id">
          <User></User>
        </Route>
        <Route path="/users">
          <UserList></UserList>
        </Route>
        <Route path="/blogs">
          <div>
            <BlogForm ></BlogForm>
            <BlogList></BlogList>
          </div>
        </Route>
        <Route path="/blog/:id">
          <Blog></Blog>
        </Route>
      </Switch >

    </Router >
  )
}

export default App