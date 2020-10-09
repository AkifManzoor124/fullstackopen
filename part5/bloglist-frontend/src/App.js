import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (e) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  //Can move into BlogForm.js
  const handleBlogForm = async (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    const blog = {
      title: title,
      author: author,
      url: url
    }

    const response = await blogService.create(blog)
    
    setTitle('')
    setAuthor('')
    setUrl('')

    const updatedBlogs = [...blogs]
    updatedBlogs.push(response)
    setBlogs(updatedBlogs)

    setErrorMessage(toString(response))
  }

  const updateBlog = async (blogId, blogObject) => {

    try {
      const response = await blogService.update(blogId, blogObject)
      const updateIndex = blogs.findIndex(blog => blog.id === blogId)

      const updatedBlogs = [...blogs]
      updatedBlogs[updateIndex] = response

      setBlogs(updatedBlogs)

    } catch (e) {
      console.log(e)
      setErrorMessage(toString(e))
    }
  }

  const removeBlog = async (blogId) => {
    try {
      const blog = blogs.find(blog => blog.id === blogId)
      const blogIndex = blogs.findIndex(blog => blog.id === blogId)
      const input = window.confirm("Delete " + blog.title + " by " + blog.author)
      
      let updatedBlogs = [...blogs]
      updatedBlogs.splice(blogIndex, 1)
      setBlogs(updatedBlogs)

      if (input) { 
        const response = await blogService.remove(blog.id) 
        console.log(response)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>

      <Notification message={errorMessage} />

      {user === null ?
        <Togglable buttonLabel={"Login"}>
          <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}></Login>
        </Togglable>
        : <div>
          <b>{user.name}</b> is logged in &nbsp;
            <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel={"Add New Blog"} ref={blogFormRef}>
            <BlogForm title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleBlogForm={handleBlogForm}></BlogForm>
          </Togglable>
        </div>
      }

      <h2>blogs</h2>

      { (blogs.sort((a, b) => b.likes - a.likes))
      .map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App