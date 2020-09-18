import React from 'react'

const FilterForm = (props) => {
  
    const filterByName = (event) => {
      props.setFilter(event.target.value)
    }
  
    return(
      <form>
        <div>
          filter shown with: <input onChange={filterByName}/>
        </div>
     </form>
    )
  }

export default FilterForm