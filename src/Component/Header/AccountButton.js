import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";

function AccountButton() {
  const navigate = useNavigate();
  const loginCookiesName = "loginData";
  const handleLogout = () => {
    Cookies.remove(loginCookiesName);
    window.location.reload();
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
    <div className="dropdown d-flex align-items-center">
      <button
        className="btn dropdown-toggle p-0 border-0 d-none d-lg-block"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
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
      </button>
      {/* Dành cho màn hình nhỏ */}
      <ul
        className="d-lg-none mt-2 list-group list-unstyled"
      >
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
      {/* Dành cho màn hình lớn */}
      <ul
        className="dropdown-menu dropdown-menu-lg-end mt-2"
        aria-labelledby="dropdownMenuButton"
        style={{zIndex: '10000'}}
      >
        <li className="">
          <span className="dropdown-item-text">
            {userData?.firstName} {userData?.lastName}
          </span>
        </li>

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
          <hr className="dropdown-divider" />
        </li>
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
    </div>
  );
}

export default AccountButton;
