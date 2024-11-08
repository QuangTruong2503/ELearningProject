import React from 'react'
import ViewBanner from '../Component/Home/ViewBanner'
import AllSubjects from '../Component/Home/AllSubjects'
import DiscoveryCourses from '../Component/Home/DiscoveryCourses'
function HomePage() {
  return (
    <div className='min-vh-100'>
        <ViewBanner />
        <AllSubjects />
        <DiscoveryCourses />
    </div>
  )
}

export default HomePage