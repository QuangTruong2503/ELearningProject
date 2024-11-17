import React, { useEffect, useState } from "react";
import "../../CssFolder/MyCourses.css";
import ListCourses from "./ListCourses";
import { fetchCoursesByTeacher } from "../../API/coursesAPI";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";
function MyCourses() {
  const [mycourses, setMyCourses] = useState([]);
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
          //Lấy dữ liệu các khóa học người dùng giáo viên đã tạo
          const myCoursesResults = await fetchCoursesByTeacher(`Courses/teacher?id=${userData.userID}`)
          if(myCoursesResults !== null)
          {
            setMyCourses(myCoursesResults);
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
      {mycourses.length !== 0 && (
        <ListCourses title={'Khóa học đã tạo'} data={mycourses} userData={userData} create={true} loading={isLoading} myCourse={true}/>
      )}
    </div>
  );
}

export default MyCourses;
