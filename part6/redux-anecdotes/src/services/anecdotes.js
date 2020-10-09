import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
    const anecdote = {content: content, votes: 0}
    const response = await axios.post(baseURL, anecdote)
    console.log("RESPONSE DATA ", response.data)
    return response.data
}

const update = async (newObject) => {
  return axios.put(`${baseURL}/${newObject.id}`, newObject)
} 

export default { getAll, createNew, update}