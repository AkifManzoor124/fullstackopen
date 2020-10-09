import React from 'react'
import { useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'

const User = () => {
    const users = useSelector(state => state.users)
    const id = useParams().id
    const user = users.find(n => n.id === id)

    if (!user || user === undefined) {
        return null
    }

    return (
        <div>
            
            <h1>{user.name}</h1>
            {(user.blogs).map(blog => 
                <div key={blog.id}>
                    <li>{blog.title}</li>
                </div>
            )}
        </div>
    )
}

export default User

