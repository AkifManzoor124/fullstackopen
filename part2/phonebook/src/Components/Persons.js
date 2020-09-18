import React from 'react'
import personService from '../services/persons'


const Persons = (props) => {

  const deletePerson = (person) => {
    
    window.confirm('Delete ' + person.name + '?')

    console.log(person.id)
    
    personService
      .remove(person.id)
      .then(response => {
        console.log(response.data)
      })
  }

  console.log("Filter Lenght", props.filter.length)
  console.log("Persons:", props.persons)
  const showList = (props.filter.length === 0) ? props.persons : props.persons.filter((person) => person.name.includes(props.filter))
  console.log(showList)
  return (
    <div>
      {showList.map((person, i) => <li key={i}>{person.name} {person.number} <button onClick={ () => deletePerson(person)}>Delete</button></li>)}
    </div>
  )
}
export default Persons