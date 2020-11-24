import React from 'react'

const List = ({items=[], loading= false}) => {
 return (
  <ul>
   {items.map(item => <li key={item}>{item}</li>)}
  </ul>
  
 )
}

export default List
