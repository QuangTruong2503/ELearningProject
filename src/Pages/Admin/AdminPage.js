import React from "react";
import {Route, Routes } from "react-router-dom";
import Users from "./Users/Users.js";
import CreateCourses from "./Courses/CreateCourses.js";
import AdminDashboard from "../../Component/Admin/AdminDashboard.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function AdminPage() {
    const collapseData = [
      {
        title: "Người dùng",
        data: [
          {name: 'Danh sách người dùng', url: 'users/all'}
        ],
      },
      {
        title: "Khóa học",
        data: [
          {name: 'Tạo Khóa học', url: 'courses/create'}
        ],
      },
    ];  
  return (
      <div className="row">
        {/* Nút Menu cho thiết bị di động */}
        <div className="mb-3 d-flex justify-content-start">
          <button
            className="btn btn-outline-primary d-lg-none mt-2 ms-2 d-flex align-items-center"
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
              Dashboard
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <AdminDashboard data={collapseData}/>
          </div>
        </div>

        {/* Sidebar cho màn hình lớn */}
        <div className="col-lg-3 d-md-none d-none d-lg-block h-auto">
          <div className="container mt-5 p-4 rounded shadow h-auto">
            <h5 className="border-bottom pb-2">Dashboard</h5>
            <AdminDashboard data={collapseData}/>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="col-md-12 col-lg-9 px-4">
            <div className="container mt-5 p-4 rounded shadow">
                <Routes>
                    <Route path="users/all" element={<Users />} />
                    <Route path="courses/create" element={<CreateCourses />} />
                </Routes>
            </div>
          
        </div>
      </div>
  );
}

export default AdminPage;
