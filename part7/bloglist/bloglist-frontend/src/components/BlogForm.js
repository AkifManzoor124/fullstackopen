import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducer/blogReducer'
import useField from '../hooks/useField'
 

const BlogForm = () => {
    const dispatch = useDispatch()

    const title = useField('')
    const author = useField('')
    const url = useField('')    

    const handleBlogForm = async (event) => {
        event.preventDefault()

        const blog = {
            title: title.value,
            author: author.value,
            url: url.value
        }

        title.onReset()
        author.onReset()
        url.onReset()

        dispatch(createNewBlog(blog))
    }

    return (
        <div>
            <h2>Add a new blog</h2>
            <form onSubmit={handleBlogForm}>
                title: <input id="title" {...title}></input><br></br>
                author: <input id="author" {...author}></input><br></br>
                url: <input id="url" {...url}></input><br></br>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}


export default BlogForm