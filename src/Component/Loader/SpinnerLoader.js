import React from 'react'

function SpinnerLoader() {
  return (
    <div className='d-flex align-content-center justify-content-center'>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default SpinnerLoader