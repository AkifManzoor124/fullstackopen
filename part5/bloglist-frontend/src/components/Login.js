import React from 'react'
import PropTypes from 'prop-types'

const login = (props) => {

    return (
        <div>
            <form onSubmit={props.handleLogin}>
                <h1>Login to the Application</h1>
                username: <input id="username" onChange={({ target }) => props.setUsername(target.value)}></input><br></br>
                password: <input id="password" onChange={({ target }) => props.setPassword(target.value)}></input><br></br>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
  }

export default login