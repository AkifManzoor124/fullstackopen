import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'UPDATE_BLOG':
            const index = state.findIndex(blog => blog.id === action.data.id)
            const newState = [...state]
            newState[index] = action.data
            return newState
        case 'DELETE_BLOG':
            let blogIndex = state.findIndex(blog => blog.id === action.data)
            let updatedState = [...state]
            updatedState.splice(blogIndex, 1)
            return updatedState
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: "INIT_BLOGS",
            data: blogs
        })
    }
}

export const createNewBlog = (blog) => {
    return async dispatch => {
        console.log("TO BE CREATED: ", blog)
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        //const input = window.confirm("Delete " + blog.title + " by " + blog.author)
        const input = true
        if(input){
            await blogService.remove(blog.id) 
            dispatch({
                type: 'DELETE_BLOG',
                data: blog.id
            })
        }
    }
}

export const updateBlog = (blogId, blogObject) => {
    return async dispatch => {
        const response = await blogService.update(blogId, blogObject)
        dispatch({
            type:'UPDATE_BLOG',
            data: response
        })
    }
}

export default blogReducer