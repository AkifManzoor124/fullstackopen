import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const UserList = () => {
    const users = useSelector(state => state.users)

    return (
        <div>
            <h2>Users</h2>
            {(users.map(user =>
                <div key={user}>
                        <Link to={`users/${user.id}`}>{user.name}</Link><br></br>
                </div>
            ))}
        </div>
    )
}

export default UserList