import React, { useState, useEffect} from 'react'
import FilterForm from './Components/FilterForm'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Notification from './Components/Notification'
import personService from './services/persons'

const App = () => {
  
    const [persons, setPersons] = useState([]) 
    const [filter, setFilter] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [message, setMessage] = useState(null)

    useEffect( () => {
        personService  
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])
    console.log("Database:" , persons)


  return(
    <div>
      <Notification message={message} />
      <h2>PhoneBook</h2>
      <FilterForm setFilter = {setFilter}/>
      <h2>Add a new</h2>
      <PersonForm persons= {persons} newName={newName} newNumber={newNumber} filter={filter} setPersons={setPersons} setNewName={setNewName} setNumber={setNumber} setMessage={setMessage}/>
      <h2>Numbers</h2>
      <Persons filter={filter} setFilter={setFilter} persons={persons}/>
    </div>
  )
}

export default App