import React from 'react'

function SpinnerLoader() {
  return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
  )
}

export default SpinnerLoader