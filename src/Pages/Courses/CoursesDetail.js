import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../CssFolder/Course.css";
import Cookies from "js-cookie";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin.js";
import CourseCurriculum from "./CourseCurriculum.js";
import { fetchCourseByID } from "../../API/coursesAPI.js";
import {
  fetchJoinCourse,
  fetchUserInCourse,
} from "../../API/enrollmentsAPI.js";
import { toast } from "react-toastify";
import LoaderButton from "../../Component/Loader/LoaderButton.js";
import { fetchLessonsByCourse } from "../../API/lessonsAPI.js";
import { fetchExamsByCourse } from "../../API/examsAPI.js";
function CoursesDetail() {
  const navigate = useNavigate();
  const { courseID } = useParams();
  const [userData, setUserData] = useState({});
  const [courseData, setCourseData] = useState({
    courseID: "",
    courseName: "",
    description: "",
    inviteCode: "",
    isPublic: false,
    createdAt: "",
    thumbnail: "",
    teacherID: "",
    teacherFullName: "",
    subjectID: "",
    subjectName: "",
  });
  const [lessonsData, setLessonsData] = useState([]);
  const [examsData, setExamsData] = useState([]);
  const [userInCourse, setUserInCourse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isActing, setIsActing] = useState(false);

  //Hàm tham gia khóa học
  const handleJoinCourse = async (e) => {
    e.preventDefault();
    setIsActing(true);
    if (Cookies.get("loginData") === undefined) {
      navigate("/login");
      return;
    }
    if (courseID === undefined) {
      toast.warning("Lỗi không thể đọc mã khóa học");
      setIsActing(false);
      return;
    }
    const result = await fetchJoinCourse(userData.userID, courseID);
    if (result !== null) {
      if (result.success === true) {
        toast.success(result.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else if (result.success === false) toast.warning(result.message);
    }
  };

  //Kiểm tra đăng nhập hợp lệ với token
  useEffect(() => {
    if (Cookies.get("loginData") !== undefined) {
      const handleVerifyLogin = async () => {
        const result = await fetchVerifyLogin();
        setUserData(result);
      };
      handleVerifyLogin();
    }

    window.scrollTo(0, 0);
  }, []);

  //Lấy dữ liệu Course với ID
  useEffect(() => {
    const fetchData = async () => {
      if (courseID !== undefined) {
        try {
          // Fetch course data
          const courseResults = await fetchCourseByID(courseID);
          if (courseResults !== null) {
            setCourseData(courseResults);
          }
  
          // Fetch lessons data
          const lessonsResults = await fetchLessonsByCourse(courseID);
          if (lessonsResults !== null) {
            setLessonsData(lessonsResults);
          }

          const examsResults = await fetchExamsByCourse(courseID);
          if(examsResults !== null)
          {
            setExamsData(examsResults)
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // Set loading to false once all data fetching is completed
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [courseID]);
  //Kiểm tra dữ liệu người dùng đã tham gia khóa học chưa
  useEffect(() => {
    if (courseID !== undefined && userData.userID !== undefined) {
      const handleCheckUserInCourse = async () => {
        const result = await fetchUserInCourse(userData.userID, courseID);
        if (result !== null) {
          setUserInCourse(result.success);
          console.log(result);
        }
      };
      handleCheckUserInCourse();
    }
  }, [courseID, userData]);
  return (
    <div className="course-container">
      {isLoading && (
        <div class="course-details p-4 border rounded placeholder-glow">
          <p class="mb-4 placeholder col-12 bg-secondary"></p>
          <p>
            <span class="placeholder col-6 bg-secondary"></span>
          </p>
          <p>
            <span class="placeholder col-4 bg-secondary"></span>
          </p>
          <p>
            <span class="placeholder col-2 bg-secondary"></span>
          </p>
          <p>
            <span class="placeholder col-2 bg-secondary"></span>
          </p>
        </div>
      )}
      {!isLoading && (
        <div>
          <div
            className="course-header"
            style={{ backgroundImage: `url(${courseData.thumbnail})` }}
          >
            <div className="course-header-overlay">
              <h1>{courseData.courseName}</h1>
              <p className="subject">Môn học: {courseData.subjectName}</p>
              <p className="description">{courseData.description}</p>
            </div>
          </div>

          <div className="course-details">
            <h2>Thông tin khóa học</h2>
            <p>
              <strong>Giáo viên:</strong> {courseData.teacherFullName}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(courseData.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Bài học:</strong> {lessonsData.length}
            </p>
            <p>
              <strong>Bài kiểm tra:</strong> {examsData.length}
            </p>
          </div>

          <div className="course-details">
            <h2 className="mb-3">Nội dung khóa học</h2>
            <CourseCurriculum attended={userInCourse} lessons={lessonsData} exams={examsData} />
          </div>

          {!userInCourse && (
            <form className="join-section" onSubmit={handleJoinCourse}>
              {isActing ? (
                <button disabled className="join-btn">
                  <LoaderButton />
                </button>
              ) : (
                <button type="submit" className="join-btn">
                  Tham gia khóa học
                </button>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default CoursesDetail;
