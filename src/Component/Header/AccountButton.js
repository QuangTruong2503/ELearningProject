import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchVerifyToken } from "../../API/loginAPI";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  const userToken = userData.token;
  const handleVerifyToken = async (userToken) => {
    const result = await fetchVerifyToken(userToken);
    if(result === undefined)
    {
        toast.error('Kiểm tra token không thành công')
        return;
    }
    if(result.success === false)
    {
        toast.error('Token không hợp lệ')
        return;
    }
    setDecodedData(JSON.parse(result.data))
  }
  useEffect(() =>{
    handleVerifyToken(userToken);
  }, [userToken])
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
      <Toaster />
    </div>
  );
}

export default AccountButton;
