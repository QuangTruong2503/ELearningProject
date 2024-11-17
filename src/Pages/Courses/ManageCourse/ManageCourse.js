import React, { useEffect } from "react";
import {Route, Routes, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { fetchVerifyLogin } from "../../../Helpers/VerifyLogin.js";
import { fetchCheckOwnerCourse } from "../../../API/coursesAPI.js";
import { toast } from "react-toastify";
import ManageCourseDashboard from "./ManageCourseDashboard.js";
import EditCourse from "./EditCourse.js";
function AdminPage() {
    const {courseID} = useParams();
    const navigate = useNavigate();
    const collapseData = [
        {
          name: "Thông tin",
          url: "details",
        },
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
            <ManageCourseDashboard data={collapseData}/>
          </div>
        </div>

        {/* Sidebar cho màn hình lớn */}
        <div className="col-lg-3 d-md-none d-none d-lg-block h-auto">
          <div className="container mt-5 p-4 rounded shadow position-sticky sticky-top">
            <h5 className="border-bottom pb-2"> Quản lý khóa học</h5>
            <ManageCourseDashboard data={collapseData}/>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="col-md-12 col-lg-9 px-4 ">
            <div className="container mt-5 p-4 rounded shadow min-vh-100">
                <Routes>
                    <Route path="details" Component={EditCourse}/>
                </Routes>
            </div>
          
        </div>
      </div>
  );
}

export default AdminPage;
