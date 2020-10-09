import React from 'react'
import { connect } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    return (
        <div>
            <h2>Anecdotes</h2>
            {props.showList.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            props.voteAnecdote(anecdote)
                            props.setNotification(anecdote.content, 4000)
                            }} >vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const mapStateToProps = (state) => {
    return{
        showList: (state.filter.length === 0) ? state.anecdotes : state.anecdotes.filter( anecdote => anecdote.content.includes(state.filter) )
    }
}



const connectedList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
export default connectedList