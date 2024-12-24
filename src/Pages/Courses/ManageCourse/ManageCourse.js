import React, { useEffect } from "react";
import {Route, Routes, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { fetchVerifyLogin } from "../../../Helpers/VerifyLogin.js";
import { fetchCheckOwnerCourse } from "../../../API/coursesAPI.js";
import { toast } from "react-toastify";
import ManageDashboard from "../../../Component/ManageDashboard.js";
import ResultWithExam from "./ResultWithExam.tsx";
import EditCourse from "./EditCourse.js";
import JoinedUsers from "./JoinedUsers.js";
import Lessons from './Lessons.js'
import Exams from './Exams.js'
import FinishCourse from "./FinishCourse.js";
import EditExam from "./EditExam.js";
function AdminPage() {
    const {courseID} = useParams();
    const navigate = useNavigate();
    const collapseData = [
        {
          name: "Thông tin",
          url: "details",
        },
        {
          name: "Bài học",
          url: "lessons",
        },
        {
          name: "Bài kiểm tra",
          url: "exams",
        },
        {
          name: "Thành viên",
          url: "joined-users",
        }
        ,
        {
          name: "Kết thúc",
          url: "finish-course",
        }
      ];
    //Kiểm tra token
    useEffect(() =>{
      const handleVerifyLogin = async () => {
        const data = await fetchVerifyLogin();
        if (data !== undefined) {
          const teacherID = data.userID
          const checkResult = await fetchCheckOwnerCourse(teacherID, courseID);
          if(checkResult !== null)
          {
            if(checkResult.success === false)
            {
                toast.error(checkResult.message);
                navigate('/');
            }
          }
        }
      };
      handleVerifyLogin();

      window.scrollTo(0, 0)
    },[navigate, courseID])  
  return (
      <div className="row">
        {/* Nút Menu cho thiết bị di động */}
        <div className="mb-3 d-flex justify-content-start position-sticky sticky-top">
          <button
            className="btn btn-outline-primary d-lg-none mt-2 ms-2 d-flex align-items-center z-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
          >
            <FontAwesomeIcon icon={faBars}/> Menu
          </button>
        </div>

        {/* Offcanvas Sidebar cho thiết bị di động */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasSidebar"
          aria-labelledby="offcanvasSidebarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
              Quản lý khóa học
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ManageDashboard data={collapseData}/>
          </div>
        </div>

        {/* Sidebar cho màn hình lớn */}
        <div className="col-lg-3 d-md-none d-none d-lg-block h-auto">
          <div className="container mt-5 p-4 rounded shadow position-sticky sticky-top">
            <h5 className="border-bottom pb-2"> Quản lý khóa học</h5>
            <ManageDashboard data={collapseData}/>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="col-md-12 col-lg-9 px-4 ">
            <div className="container mt-5 p-4 rounded shadow min-vh-100">
                <Routes>
                    <Route path="details" Component={EditCourse}/>
                    <Route path="lessons" Component={Lessons}/>

                    <Route path="exams" Component={Exams}/>
                    <Route path="exams/detail/:examID" Component={EditExam}/>
                    <Route path="exams/results/:examID" Component={ResultWithExam}/>

                    <Route path="joined-users" Component={JoinedUsers}/>
                    <Route path="finish-course" Component={FinishCourse}/>
                </Routes>
            </div>
          
        </div>
      </div>
  );
}

export default AdminPage;
