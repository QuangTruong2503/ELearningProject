import React, { useEffect } from "react";
import {Route, Routes } from "react-router-dom";
import Users from "./Users/Users.js";
import AdminDashboard from "../../Component/Admin/AdminDashboard.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Courses from "./Courses/Courses.js";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin.js";
import { toast } from "react-toastify";
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
          {name: 'Danh sách Khóa học', url: 'courses'},
        ],
      },
    ];
    //Kiểm tra token
    useEffect(() =>{
      const handleVerifyLogin = async () => {
        const data = await fetchVerifyLogin();
        if (data !== undefined) {
          if(data.roleID !== 'admin')
          {
            toast.warning('Bạn không phải là admin');
            window.location.href = '/'
          }
        }
      };
      handleVerifyLogin();
    },[])  
  return (
      <div className="row">
        {/* Nút Menu cho thiết bị di động */}
        <div className="mb-3 d-flex justify-content-start position-sticky sticky-top">
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
          <div className="container mt-5 p-4 rounded shadow position-sticky sticky-top">
            <h5 className="border-bottom pb-2">Dashboard</h5>
            <AdminDashboard data={collapseData}/>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="col-md-12 col-lg-9 px-4">
            <div className="container mt-5 p-4 rounded shadow">
                <Routes>
                    {/* Users */}
                    <Route path="users/all" element={<Users />} />
                    {/* Courses */}
                    <Route path="courses" element={<Courses />}/>
                </Routes>
            </div>
          
        </div>
      </div>
  );
}

export default AdminPage;
