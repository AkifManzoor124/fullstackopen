import React from 'react'

const BlogForm = (props) => {
    return (
        <div>
            <h2>Add a new blog</h2>
            <form onSubmit={props.handleBlogForm}>
                title: <input id="title" value={props.title} onChange={({ target }) => props.setTitle(target.value)}></input><br></br>
                author: <input id="author" value={props.author} onChange={({ target }) => props.setAuthor(target.value)}></input><br></br>
                url: <input id="url" value={props.url} onChange={({ target }) => props.setUrl(target.value)}></input><br></br>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}


export default BlogForm