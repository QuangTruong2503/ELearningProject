import React, { useEffect, useState } from "react";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";
import { fetchUserByID } from "../../API/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

interface User {
  user_id: string;
  user_name: string;
  email: string;
  created_at: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role_id: string;
  role_name: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    //Kiểm tra đăng nhập
    const handleVerifyLogin = async () => {
      const data = await fetchVerifyLogin();
      if (data !== undefined) {
        const userID = data.userID;
        const result = await fetchUserByID(userID);
        if (result !== null) {
          setUser(result);
        }
      }
    };
    handleVerifyLogin();

    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <h4 className="my-3">Tổng quan</h4>
      {user !== undefined && user !== null && (
        <div>
          <div className="row">
            <div className="mb-3 d-flex flex-lg-column flex-md-column col-lg-3 col-md-4 col-12 gap-1 overflow-hidden">
              <span className="text-dark-emphasis p-1">Tên đăng nhập</span>
              <strong className="p-1">{user.user_name}</strong>
            </div>
            <div className="mb-3 d-flex flex-lg-column flex-md-column col-lg-3 col-md-4 col-12 gap-1 overflow-hidden ">
              <span className="text-dark-emphasis p-1">Email</span>
              <strong className="p-1">{user.email}</strong>
            </div>
            <div className="mb-3 d-flex flex-lg-column flex-md-column col-lg-3 col-md-4 col-12 gap-1 overflow-hidden">
              <span className="text-dark-emphasis p-1">Họ và tên</span>
              <strong className="p-1">
                {user.first_name} {user.last_name}
              </strong>
            </div>
            <div className="mb-3 d-flex flex-lg-column flex-md-column col-lg-3 col-md-4 col-12 gap-1 overflow-hidden">
              <span className="text-dark-emphasis p-1">Nhóm khách hàng</span>
              <strong className="p-1">{user.role_name}</strong>
            </div>
            <div className="mb-3 d-flex flex-lg-column flex-md-column col-lg-3 col-md-4 col-12 gap-1 overflow-hidden">
              <span className="text-dark-emphasis p-1">Ngày tham gia</span>
              <strong className="p-1">
                {new Date(user.created_at).toLocaleString()}
              </strong>
            </div>
          </div>
          <hr></hr>
          {/* ảnh */}
          <div className="d-flex">
            <div className="d-flex align-items-center">
              <img
                src={user.avatar_url}
                alt="avatar"
                style={{ width: "11rem", borderRadius: "50%" }}
              />
              <div className="d-flex flex-column justify-content-center gap-1 flex-lg-row flex-md-row h-100">    
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-primary d-flex gap-1 align-items-center">
                    <span>Chọn ảnh</span>
                    <FontAwesomeIcon icon={faImage} />
                    </button>
                </div>
                <div className="vertical-line d-none d-lg-block d-md-block"></div>
                <div className="fs-6 text-dark-emphasis d-flex flex-column justify-content-center">
                    <p>Vui lòng chọn ảnh nhỏ hơn 3MB</p>
                    <p>Chọn hình ảnh phù hợp, không phản cảm</p>
                </div>
              </div>
            </div>
          </div>
          {/* Cập nhật */}
          <hr></hr>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Profile;
