import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import "../../CssFolder/Header.css";
function AccountButton() {
  const navigate = useNavigate();
  const loginCookiesName = "loginData";
  const handleLogout = () => {
    Cookies.remove(loginCookiesName);
    window.location.href = "/";
  };
  const [decodedData, setDecodedData] = useState({});
  //Lấy dữ liệu từ Cookies
  const storedData = Cookies.get(loginCookiesName);
  const userData = storedData ? JSON.parse(storedData) : null;
  const handleVerifyToken = async () => {
    const result = await fetchVerifyLogin();
    if (result !== undefined) {
      setDecodedData(result);
    }
  };
  useEffect(() => {
    if (storedData !== undefined) {
      handleVerifyToken();
    }
  }, [storedData]);
  return (
    <div>
      {/* Dành cho màn hình nhỏ */}
      <ul className="d-lg-none mt-2 list-group list-unstyled">
        <hr />
        {decodedData.roleID === "admin" && (
          <li>
            <button
              className="dropdown-item text-primary py-2 d-flex gap-2"
              onClick={() => navigate("/admin")}
            >
              <span>
                <FontAwesomeIcon icon={faCodepen} />
              </span>
              <span>Trang quản lý</span>
            </button>
          </li>
        )}
        <li>
          <NavLink
            to={`/account/profile`}
            className="dropdown-item py-2 d-flex gap-2"
          >
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span>Quản lý tài khoản</span>
          </NavLink>
        </li>
        {decodedData.roleID !== "student" && (
          <li>
            <button
              className="dropdown-item  py-2 d-flex gap-2"
              onClick={() => navigate("/my-courses")}
            >
              <span>
                <FontAwesomeIcon icon={faBook} />
              </span>
              <span>Khóa học của tôi</span>
            </button>
          </li>
        )}

        <li>
          <button
            className="dropdown-item text-danger py-2 d-flex gap-2"
            onClick={() => handleLogout()}
          >
            <span>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <span>Đăng xuất</span>
          </button>
        </li>
      </ul>
      <div className="dropdown d-none d-lg-flex align-items-center">
        <button
          className="btn p-0 border-0 d-none d-lg-block d-lg-flex gap-1 align-items-center"
          type="button"
          aria-expanded="false"
        >
          <img
            src={userData.avatar}
            alt="User Avatar"
            width="40"
            height="40"
            className=""
            style={{ borderRadius: "50%", objectFit: "fill" }}
          />
          <span>{userData.userName}</span>
        </button>
        {/* Dành cho màn hình lớn */}
        <ul
          className="dropdown-header--content mt-2 list-group list-unstyled"
          aria-labelledby="dropdownMenuButton"
          style={{ zIndex: "10000" }}
        >
          <li className="drp-name border-bottom border-1">
            <span className="dropdown-item-text">
              {userData?.firstName} {userData?.lastName}
            </span>
          </li>
          {decodedData.roleID === "admin" && (
            <li>
              <NavLink
                to={`/admin`}
                className="dropdown-item text-primary py-2 d-flex gap-2"
              >
                <span>
                  <FontAwesomeIcon icon={faCodepen} />
                </span>
                <span>Trang quản lý</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to={`/account/profile`}
              className="dropdown-item py-2 d-flex gap-2"
            >
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span>Quản lý tài khoản</span>
            </NavLink>
          </li>
          {decodedData.roleID !== "student" && (
            <li>
              <NavLink
                to={`/my-courses`}
                className="dropdown-item  py-2 d-flex gap-2"
              >
                <span>
                  <FontAwesomeIcon icon={faBook} />
                </span>
                <span>Khóa học của tôi</span>
              </NavLink>
            </li>
          )}
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <NavLink
              className="dropdown-item text-danger py-2 d-flex gap-2"
              onClick={() => handleLogout()}
            >
              <span>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
              <span>Đăng xuất</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AccountButton;
