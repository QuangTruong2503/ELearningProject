import React, { useEffect, useState } from "react";
import "../../CssFolder/MyCourses.css";
import ListCourses from "../MyCourses/ListCourses.js";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";
import { fetchJoinedCoursesByUser } from "../../API/enrollmentsAPI";
function AttendedCourses() {
  const [joinedCourses, setJoinedCourses] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    const handleVerifyLogin = async () =>{
      const result = await fetchVerifyLogin();
      setUserData(result)
    }
    handleVerifyLogin();
  },[])
  //Lấy dữ liệu khóa học sau khi kiểm tra đăng nhập
  useEffect(() =>{
    if(userData.userID !== undefined)
    {
      const handleGetData = async () =>{
        try{
          //Lấy dữ liệu các khóa học người dùng đã tham gia
          const joinedCourses = await fetchJoinedCoursesByUser(`Enrollments/by-user?userID=${userData.userID}`)
          if(joinedCourses !== null)
            {
              setJoinedCourses(joinedCourses);
            }
        }
        catch(err)
        {
          console.error('Lỗi khi lấy dữ liệu'+err)
        }
        finally{
          setIsLoading(false);
        }
      }
      handleGetData();
    }
    else{
      
    }
  },[userData])
  return (
    <div>
      <ListCourses title={'Khóa học đã tham gia'} data={joinedCourses} userData={userData} loading={isLoading}/>
    </div>
  );
}

export default AttendedCourses;
