import React, { useState } from 'react'


const Blog = ({ blog, updateBlog, removeBlog }) => {

  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setBlogVisible(!blogVisible)
  }

  const updateLike = () => {
    const blogObject = {
      user: blog.user,
      author: blog.author,
      title: blog.title,
      likes: blog.likes + 1,
      url: blog.url
    }

    updateBlog(blog.id, blogObject)
  }

  const detailsView = () => (
    <div>
      {blog.url}
      <br></br>
      {blog.likes} <button onClick={updateLike}>Like</button>
      <br></br>
      {blog.author}
      <br></br>
      <button onClick={() => removeBlog(blog.id)} >Delete</button>
    </div>
  )


  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author} &nbsp;
      <button onClick={toggleDetails}>{blogVisible ? "hide" : "view"}</button>
      {blogVisible ? detailsView() : false}
    </div>
  )
}

export default Blog
