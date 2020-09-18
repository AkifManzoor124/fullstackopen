import React from 'react'
import personService from '../services/persons'

const PersonForm = (props) => {

  const addInput = (event) => {
    event.preventDefault()

    if (props.persons.findIndex(elem => elem.name === props.newName) === -1) {

      personService
        .create({ name: props.newName, number: props.newNumber })
        .then(response => {
          props.setPersons(props.persons.concat({ name: props.newName, number: props.newNumber }))
          props.setNewName('')
          props.setNumber('')          
          console.log(response)
          props.setMessage('Added: ' + props.newName)
        }).catch(error => {
          console.log(error.response.data)
          props.setMessage(error.response.data)
        })

    } else {
      const userInput = window.confirm(props.newName + " is already in the phonebook. Would you like to replace the old number with the new one?")
      const person = props.persons.find(n => props.newName === n.name)
      console.log("Person:", person)
      console.log("id", person.id)
      console.log("New Name:" + props.newName)
      console.log("New Number:", props.newNumber)
      if (userInput === true) {
        personService
          .update(person.id, { name: props.newName, number: props.newNumber })
          .then(response => {
            console.log(response)
            props.setMessage('Changed phone number of: ' + props.newName + ' to: ' + props.newNumber)
          })
          .catch(error => {
            props.setMessage(error.response.data)
          })
      }


    }
  }

  const handleNameChange = (event) => {
    props.setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    props.setNumber(event.target.value)
  }

  return (
    <div>
      <form onSubmit={addInput}>
        <div>
          name: <input onChange={handleNameChange} />
          <br></br>
            phone number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm