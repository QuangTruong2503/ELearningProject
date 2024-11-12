import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../CssFolder/Course.css'
import { fetchVerifyLogin } from '../../Helpers/VerifyLogin.js'
function CoursesDetail() {
    const {courseID} = useParams();
  const [courseData, setCourseData] = useState({
    courseID: "452cfab9-9fe1-11ef-8f8b-ce039959f5d6",
    courseName: "Sinh Học Phổ Thông",
    description: "Khóa học về sinh học cơ bản dành cho học sinh phổ thông",
    inviteCode: "SH3456",
    isPublic: false,
    createdAt: "2024-11-11T03:58:54",
    thumbnail:
      "https://res.cloudinary.com/brandocloud/image/upload/v1730959170/ELearning/Courses/courses-default.png",
    teacherID: "283df8ef-98ba-4d80-8537-0f4d548c476f",
    teacherFullName: "Tran Thanh",
    subjectID: "biology",
    subjectName: "Sinh học",
  });
  useEffect(() =>{
    const handleVerifyLogin = async () =>{
        const result = await fetchVerifyLogin();
        console.log(result);
    }
    handleVerifyLogin();
    window.scrollTo(0, 0)
  },[])
  return (
    <div class="course-container">
      <div
        class="course-header"
        style={{ backgroundImage: `url(${courseData.thumbnail})` }}

      >
        <div class="course-header-overlay">
          <h1>{courseData.courseName}</h1>
          <p class="subject">Môn học: {courseData.subjectName}</p>
          <p class="description">
            {courseData.description}
          </p>
        </div>
      </div>

      <div class="course-details">
        <h2>Thông tin khóa học</h2>
        <p>
          <strong>Giáo viên:</strong> {courseData.teacherFullName}
        </p>
        <p>
          <strong>Ngày tạo:</strong> {new Date(courseData.createdAt).toLocaleString()}
        </p>
      </div>

      <div class="join-section">
        <button class="join-btn">Tham gia khóa học</button>
      </div>
    </div>
  );
}

export default CoursesDetail;
