import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import AccountButton from "./AccountButton";
import AttendCourse from "./AttendCourse";
function HeaderComponent() {
  const loginCookiesName = "loginData";
  const loginCookies = Cookies.get(loginCookiesName);
  return (
    <nav className="navbar navbar-expand-lg box-shadow">
      <div className="container">
        <a className="navbar-brand text-primary fs-3" href="/">
          E-Learning
        </a>
        <button
          className="navbar-toggler text-primary"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav nav mb-2 mb-lg-0">
            {loginCookies !== undefined &&(
              <li className="nav-item">
              <NavLink to={'/attended-courses'} className="nav-link" aria-current="page">
                Khóa học
              </NavLink>
            </li>
            )}
          </ul>
          {loginCookies === undefined && (
            <div className="d-flex gap-2">
              <NavLink className="btn btn-outline-primary" to={"/register"}>
                Đăng ký
              </NavLink>
              <NavLink className="btn btn-outline-primary" to={"/login"}>
                Đăng nhập
              </NavLink>
            </div>
          )}
          {loginCookies !== undefined && (
            <div className="d-flex flex-lg-row flex-column gap-2">
              <AttendCourse />
              <AccountButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;
