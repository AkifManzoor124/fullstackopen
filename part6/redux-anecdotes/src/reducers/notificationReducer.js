const reducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type){
        case 'CREATE_NOTIFICATION': 
            return action.data
        case 'REMOVE_NOTIFICATION':
            return action.data
        case 'VOTE_NOTIFICATION':
            return action.data
        default: 
            return state
    }

}

var timeoutID
export const setNotification = (content, timeout) => {
    clearTimeout(timeoutID)
    return async dispatch => {
        dispatch({
            type: "CREATE_NOTIFICATION",
            data: content
        })
        timeoutID = setTimeout(() => {
            dispatch(removeNotification())
        }, timeout);
    }
}

export const removeNotification = () => {
    return({
        type: "REMOVE_NOTIFICATION",
        data: ""
    })
}

export const voteNotification = (content) => {
    return({
        type: "VOTE_NOTIFICATION",
        data: "You voted for: " + content
    })
}


export default reducer