import React from 'react'

const Total = (props) => {

    const array = props.parts.map((part) => {
        return part.exercises
    })

    const total = array.reduce((accumulator, currentvalue) => {
        return accumulator + currentvalue;
    })

    return (
      <p>Number of exercises {total}</p>
    )
  }

  export default Total