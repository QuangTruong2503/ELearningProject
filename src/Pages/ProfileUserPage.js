import React, { useEffect } from 'react'
import '../CssFolder/User.css'
function ProfileUserPage() {

    useEffect(() =>{
        window.scrollTo(0, 0)
    })
  return (
    <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="profile-card text-center p-4">
          <div class="d-flex justify-content-center">
            <img src="https://res.cloudinary.com/brandocloud/image/upload/v1730775157/ELearning/avatar/avatar_default.png" 
                 alt="User Avatar" class="avatar" />
          </div>
          <h3 class="mt-3">Nguyen Minh</h3>
          <p class="text-muted">minh.nguyen@example.com</p>
          <span class="role-badge">Teacher</span>
          <div class="mt-4 text-start">
            <p><strong>Tham gia:</strong> November 6, 2024</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProfileUserPage