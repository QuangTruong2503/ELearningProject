import React from "react";
import {Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ManageDashboard from "../../Component/ManageDashboard.js";
import Profile from "./Profile.tsx";

function ManageAccount() {
    const collapseData = [
        {
          name: "Thông tin tài khoản",
          url: "profile",
        },
      ];
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
              Quản lý tài khoản
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
            <h5 className="border-bottom pb-2"> Quản lý tài khoản</h5>
            <ManageDashboard data={collapseData}/>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="col-md-12 col-lg-9 px-4 ">
            <div className="container mt-5 p-4 rounded shadow min-vh-100">
                <Routes>
                    <Route path="profile" Component={Profile}/>
                </Routes>
            </div>
          
        </div>
      </div>
  );
}

export default ManageAccount;
