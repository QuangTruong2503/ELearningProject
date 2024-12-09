import React from 'react'
import { useParams } from 'react-router-dom'

function SearchPage() {
    const {searchValue} = useParams();
  return (
    <div>searchValue: {searchValue}</div>
  )
}

export default SearchPage