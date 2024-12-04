import React, { useEffect, useState } from "react";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";
import {
  fetchUpdateImageByUser,
  fetchUpdateUserByID,
  fetchUserByID,
} from "../../API/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { fetchUploadCloudinaryOneImage } from "../../Helpers/UploadImageToCloudinary";
import LoaderButton from "../../Component/Loader/LoaderButton";

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
  const [reload, setReload] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (user !== undefined && user !== null) {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };
  //Thay đổi hình ảnh
  const handleImageChange = async (event) => {
    setIsSavingImage(true);
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024;
      if (fileSize > 3) {
        toast.warning("File ảnh không được vượt quá 3MB");
        setIsSavingImage(false)
        return;
      }
      const imageUploaded = await fetchUploadCloudinaryOneImage(file, "Users");
      if (imageUploaded !== null) {
        const result = await fetchUpdateImageByUser(
          user?.user_id,
          imageUploaded.thumbnail
        );
        if (result !== null) {
          toast.success(result.message);
          setReload(!reload);
          setIsSavingImage(false);
        }
        return;
      }
      toast.error("Cập nhật ảnh thất bại!");
      setIsSavingImage(false);
    }
  };
  //Lưu dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const result = await fetchUpdateUserByID(user);
    if (result !== null) {
      result.isSuccess
        ? toast.success(result.message)
        : toast.error(result.message);
      setIsSaving(false);
    }
  };
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
  }, [reload]);
  useEffect(() => {
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
                style={{
                  width: "11rem",
                  height: "11rem",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div className="d-flex flex-column justify-content-center gap-1 flex-lg-row flex-md-row h-100 ms-2">
                <div className="d-flex align-items-center">
                  {isSavingImage ? (
                    <label className="btn btn-primary d-flex gap-1 align-items-center w-100">
                      <LoaderButton />
                    </label>
                  ) : (
                    <label
                      className="btn btn-outline-primary d-flex gap-1 align-items-center w-100"
                      htmlFor="uploadImage"
                    >
                      <span>Chọn ảnh</span>
                      <FontAwesomeIcon icon={faImage} />
                    </label>
                  )}
                  <input
                    id="uploadImage"
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageChange}
                  />
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
          <form
            className="d-flex flex-column gap-2 col-lg-6"
            onSubmit={handleSubmit}
            onReset={() => setReload(!reload)}
          >
            <div className="form-group mb-3">
              <label>Họ</label>
              <input
                type="text"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Tên</label>
              <input
                type="text"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="d-flex gap-1">
              <button type="reset" className="btn btn-secondary">
                Đặt lại
              </button>
              {isSaving ? (
                <button disabled className="btn btn-primary">
                  <LoaderButton />
                </button>
              ) : (
                <button type="submit" className="btn btn-outline-primary">
                  Lưu thay đổi
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
