import React, { useEffect, useState } from 'react';
import '../CssFolder/User.css';
import { fetchUserByID } from '../API/user';
import { useParams } from 'react-router-dom';

// Define the type for the user data
interface User {
  user_id: string;
  user_name: string;
  email: string;
  created_at: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role_id: string;
}

function ProfileUserPage() {
  // Type the useParams hook to know userID is a string
  const { userID } = useParams<{ userID: string }>();

  // Define the state with an initial empty object
  const [userDetail, setUserDetail] = useState<User | null>(null);

  useEffect(() => {
    const handleGetUserData = async () => {
      // Fetch the user data by ID
      const user = await fetchUserByID(userID);
      if (user !== null) {
        setUserDetail(user);
      }
    };
    handleGetUserData();
    window.scrollTo(0, 0);
  }, [userID]); // Add `userID` as a dependency so it re-fetches when the userID changes

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {userDetail !== null && (
            <div className="profile-card text-center p-4">
            <div className="d-flex justify-content-center">
              {/* Use userDetail.avatar_url if available */}
              <img
                src={userDetail?.avatar_url || 'https://res.cloudinary.com/brandocloud/image/upload/v1730775157/ELearning/avatar/avatar_default.png'}
                alt="User Avatar"
                className="avatar"
              />
            </div>
            <h3 className="mt-3">{userDetail?.first_name} {userDetail?.last_name}</h3>
            <p className="text-muted">{userDetail?.email}</p>
            {/* Display the role dynamically */}
            <span className="role-badge">{userDetail?.role_id.charAt(0).toUpperCase() + userDetail?.role_id.slice(1)}</span>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileUserPage;
