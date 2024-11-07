import React from 'react'
import ViewBanner from '../Component/Home/ViewBanner'
import AllSubjects from '../Component/Home/AllSubjects'
function HomePage() {
  return (
    <div className='min-vh-100'>
        <ViewBanner />
        <AllSubjects />
    </div>
  )
}

export default HomePage