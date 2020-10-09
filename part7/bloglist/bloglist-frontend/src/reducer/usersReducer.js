import usersService from '../services/users'

const initialState = [{
    blogs: null,
    username: null,
    name: null,
    id: null
}]

const usersReducer = (state = initialState, action) => {

    switch(action.type){
        case 'INIT_USERS':
            return action.data
        default:
            return state
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const response = await usersService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: response
        })
    }
}

export default usersReducer