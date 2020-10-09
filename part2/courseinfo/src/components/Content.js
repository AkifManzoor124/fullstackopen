import Part from './Part'
import React from 'react'

const Content = (props) => {
    return (
      <div>
        {props.parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
      </div>
    )
   
  }

  export default Content