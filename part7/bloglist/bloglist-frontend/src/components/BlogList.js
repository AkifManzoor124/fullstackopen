import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <h2>blogs</h2>
      {(blogs.sort((a, b) => b.likes - a.likes))
        .map(blog =>
          <div key={blog.id}>
            <Link to={`blog/${blog.id}`}>{blog.title}</Link><br></br>
          </div>
        )}
    </div>
  )
}

export default BlogList