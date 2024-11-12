import React, { useEffect, useState } from "react";
import "../../CssFolder/MyCourses.css";
import ListCourses from "./ListCourses";
import { fetchCoursesByTeacher } from "../../API/coursesAPI";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";
function MyCourses() {
  const [mycourses, setMyCourses] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() =>{
    const handleVerifyLogin = async () =>{
      const result = await fetchVerifyLogin();
      setUserData(result)
      console.log(result);
    }
    handleVerifyLogin();
  },[])
  //Lấy dữ liệu khóa học sau khi kiểm tra đăng nhập
  useEffect(() =>{
    if(userData.userID !== undefined)
    {
      const handleGetMyCourses = async () =>{
        const results = await fetchCoursesByTeacher(`Courses/teacher?id=${userData.userID}`)
        if(results !== null)
        {
          setMyCourses(results);
          console.log(results)
        }
      }
      handleGetMyCourses();
    }
  },[userData])
  return (
    <div>
      <ListCourses title={'Khóa học của tôi'} data={mycourses} userID={userData.userID}/>
    </div>
  );
}

export default MyCourses;
