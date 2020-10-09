import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../hooks/useField'
import blogService from '../services/blogs'
import { login, setUser, logout } from '../reducer/userReducer'


const LoginForm = ({ handleLogin, username, password }) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <h1>Login to the Application</h1>
                username: <input id="username" {...username}></input><br></br>
                password: <input id="password" {...password}></input><br></br>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

const Logout = ({ name, handleLogout }) => {
    return (
        <div>
            <b>{name}</b> is logged in &nbsp;
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

const Login = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const username = useField('')
    const password = useField('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(login({username: username.value, password: password.value}))
        username.onReset()
        password.onReset()

    }

    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(logout())
    }

    return (
        <div>
            {user.name === null ?
                <LoginForm username={username} password={password} handleLogin={handleLogin}></LoginForm> :
                <Logout name={user.name} handleLogout={handleLogout}></Logout>
            }
        </div>
    )
}

export default Login