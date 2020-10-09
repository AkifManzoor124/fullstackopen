import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
    name: null,
    token: null,
    username: null
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN':
            console.log("AFTER LOGIN CASE:", action.data)
            return action.data
        case 'SET_USER':
            return action.data
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
}

export const login = (credentials) => {
    return async dispatch => {
        const response = await loginService.login(credentials)
        console.log("LOGIN RESPONSE:", response)
        blogService.setToken(response.token)
        window.localStorage.setItem(
            'loggedBlogAppUser', JSON.stringify(response)
        )        
        dispatch({
            type: 'LOGIN',
            data: response
        })
    }
}

export const setUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            data: user
        })
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default userReducer