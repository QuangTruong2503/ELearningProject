import React, { useEffect, useState } from 'react'
import { fetchVerifyLogin } from '../../Helpers/VerifyLogin';
import { fetchUserByID } from '../../API/user';

interface User{
    user_id: string;
    user_name: string;
    email: string;
    created_at: Date;
    first_name: string;
    last_name: string;
    avatar_url: string;
    role_id: string;
    role_name: string;
}

const Profile: React.FC = () =>{
    const [user, setUser] = useState<User | null>();

    useEffect(() =>{
        //Kiểm tra đăng nhập
        const handleVerifyLogin = async () => {
            const data = await fetchVerifyLogin();
            if (data !== undefined) {
                const userID = data.userID;
                const result = await fetchUserByID(userID);
                if(result !== null)
                {
                    setUser(result)
                    console.log(result)
                }
            }
          };
          handleVerifyLogin();
    
          window.scrollTo(0, 0)
    },[])    
    return(
        <div>Profile</div>
    );
}

export default Profile