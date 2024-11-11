import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";

function AccountButton() {
    const navigate = useNavigate();
  const loginCookiesName = "loginData";
  const handleLogout = () => {
    Cookies.remove(loginCookiesName);
    window.location.reload();
  };
  const [decodedData, setDecodedData] = useState({})
  //Lấy dữ liệu từ Cookies
  const storedData = Cookies.get(loginCookiesName);
  const userData = storedData ? JSON.parse(storedData) : null;
  const handleVerifyToken = async () => {
    const result = await fetchVerifyLogin();
    if(result !== undefined)
    {
      setDecodedData(result);
    }
  }
  useEffect(() =>{
    if(storedData !== undefined)
    {
      handleVerifyToken();
    }
  }, [storedData])
  return (
    <div className="dropdown d-flex align-items-center">
      <button
        className="btn dropdown-toggle p-0 border-0"
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
          className="img-fluid"
        />
      </button>
      <ul
        className="dropdown-menu dropdown-menu-lg-end mt-2"
        aria-labelledby="dropdownMenuButton"
      >
        <li className="">
          <span className="dropdown-item-text">
            {userData?.firstName} {userData?.lastName}
          </span>
        </li>
        <li className="">
          <span className="dropdown-item-text">{userData?.email}</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        {decodedData.roleID === 'admin' && (
            <li>
                <button className="dropdown-item text-primary py-2" onClick={() => navigate('/admin')}>
                    Trang quản lý
                </button>
            </li>
        )}
        <li>
          <button
            className="dropdown-item text-danger py-2"
            onClick={() => handleLogout()}
          >
            Đăng xuất
          </button>
        </li>
        
      </ul>
    </div>
  );
}

export default AccountButton;
