import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Test1 from "./Test1.js";
import Test2 from "./Test2.js";
function AdminPage() {
  return (
      <div className="row">
        {/* Nút Menu cho thiết bị di động */}
        <div className="mb-3 d-flex justify-content-start">
          <button
            className="btn btn-outline-primary d-md-none mt-2 ms-2 d-flex align-items-center"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
          >
            <i className="bi bi-list"></i> Menu
          </button>
        </div>

        {/* Offcanvas Sidebar cho thiết bị di động */}
        <div
          className="offcanvas offcanvas-start bg-light"
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
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <NavLink to="/" className="nav-link d-flex align-items-center">
                  <i className="bi bi-house-door-fill me-2"></i> Trang chủ
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/test2"
                  className="nav-link d-flex align-items-center"
                >
                  <i className="bi bi-house-door-fill me-2"></i> Test2
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar cho màn hình lớn */}
        <div className="col-md-3 col-lg-2 d-none d-md-block h-auto">
          <div className="container mt-5 p-4 bg-light rounded shadow h-auto">
            <h5 className="border-bottom pb-2">Dashboard</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <NavLink to="/admin/test1" className="nav-link d-flex align-items-center">
                  <i className="bi bi-house-door-fill me-2"></i> Trang chủ
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/test2"
                  className="nav-link d-flex align-items-center"
                >
                  <i className="bi bi-house-door-fill me-2"></i> Test2
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="col-md-9 col-lg-10 px-4">
            <div className="container mt-5 p-4 bg-light rounded shadow">
                <Routes>
                    <Route path="test1" element={<Test1 />} />
                    <Route path="test2" element={<Test2 />} />
                </Routes>
            </div>
          
        </div>
      </div>
  );
}

export default AdminPage;
