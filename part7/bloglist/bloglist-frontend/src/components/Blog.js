import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducer/blogReducer'
import { useParams } from 'react-router-dom'
import useField from '../hooks/useField'

const Blog = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  const commentField = useField('')

  if (!blog || blog === undefined) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLike = () => {
    blog.likes++
    dispatch(updateBlog(blog.id, blog))
  }

  const addComment = (event) => {
    event.preventDefault()
    blog.comments.push(commentField.value)
    console.log(blog)
    dispatch(updateBlog(blog.id, blog))
  }

  return (
    <div>
      <div className="blog" style={blogStyle}>
        <h3>{blog.title}</h3>
        <h4>{blog.author}</h4>
        <div>
          {blog.url}
          <br></br>
          {blog.likes} <button onClick={updateLike}>Like</button>
          <br></br>
          <button onClick={() => dispatch(deleteBlog(blog))} >Delete</button>
        </div>
      </div>

      <div>
        <form onSubmit={addComment}>
          <input {...commentField}></input>
          <button type="submit">Add Comment</button>
        </form>

        <h3>Comments</h3>
        {blog.comments.map( (comment, index) =>
          <div key={index}>
            <li>{comment}</li>
          </div>
        )}
      </div>

    </div>
  )
}

export default Blog
