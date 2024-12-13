import React, { useEffect, useState } from "react";
import { fetchUpdateUserByID, fetchUserByID } from "../../../API/user";
import SpinnerLoader from "../../../Component/Loader/SpinnerLoader.js";
import LoaderButton from "../../../Component/Loader/LoaderButton.js";
import { toast } from "react-toastify";
import { fetchUploadCloudinaryOneImage } from "../../../Helpers/UploadImageToCloudinary.js";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function UserDetail({ userID, onClose, onSave }) {
  const [formData, setFormData] = useState({
    user_id: "",
    user_name: "",
    last_name: "",
    first_name: "",
    email: "",
    created_at: "",
    avatar_url: "",
    role_id: "",
  });
  const [selectedImage, setSelectedImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [dataEmpty, setDataEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  //Cập nhật dữ liệu người dùng
  const handleUpdateUser = async () => {
    const result = await fetchUpdateUserByID(formData);
    if (result !== null) {
      toast.success(result.message);
      setIsSaving(false);
      onSave();
    }
  };
  //Thay đổi hình ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024;
      if (fileSize > 3) {
        toast.warning("File ảnh không được vượt quá 3MB");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar_url: imageUrl,
      }));
      setSelectedImage(file);
    }
  };
  //Cập nhật dữ liệu người dùng
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    if (selectedImage !== '') {
      const imageUploaded = await fetchUploadCloudinaryOneImage(
        selectedImage,
        "Users"
      );
      if (imageUploaded !== null) {
        const thumbnail = imageUploaded.thumbnail;
        setFormData((prev) => ({
          ...prev,
          avatar_url: thumbnail,
        }));
        setUploadSuccess(true);
        
      }
    } else {
      handleUpdateUser();
    }
  };

  //Lấy dữ liệu người dùng
  useEffect(() => {
    //Lấy dữ liệu người dùng theo ID người dùng
    const handleFetchUserByID = async () => {
      const result = await fetchUserByID(userID);
      if (result === undefined) {
        setIsLoading(false);
        setDataEmpty(true);
        return;
      }
      const data = result;
      setFormData({
        user_id: data.user_id,
        user_name: data.user_name,
        last_name: data.last_name,
        first_name: data.first_name,
        email: data.email,
        avatar_url: data.avatar_url,
        created_at: data.created_at,
        role_id: data.role_id,
      });
      setIsLoading(false);
    };
    handleFetchUserByID();
  }, [userID]);
  //Cập nhật sau khi upload ảnh
  useEffect(() => {
    //Cập nhật dữ liệu
    if (uploadSuccess === true) {
      const handleUpdateCourse = async () => {
        const result = await fetchUpdateUserByID(formData);
        if (result !== undefined) {
          toast.success(result.message);
          setIsSaving(false);
          onSave();
          setUploadSuccess(false);
          setSelectedImage('')
        }
      };
      handleUpdateCourse();
    }
  }, [uploadSuccess, formData, onSave]);

  return (
    <div className="modal show d-block modal-background" tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      {isLoading && !dataEmpty ? (
        <div className="d-flex justify-content-center align-items-center p-5">
          <SpinnerLoader />
        </div>
      ) : !dataEmpty ? (
        <>
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Thông Tin Người Dùng</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label className="form-label fw-bold">Hình ảnh</label>
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle border"
                    style={{ width: "128px", height: "128px", objectFit: "cover" }}
                    src={formData.avatar_url}
                    alt="Avatar"
                  />
                  <label
                    htmlFor="uploadImage"
                    className="btn btn-outline-success mx-3"
                  >
                    Chọn ảnh <FontAwesomeIcon icon={faImage} />
                  </label>
                  <input
                    id="uploadImage"
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label className="form-label fw-bold">Tên tài khoản</label>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    placeholder="Nhập tên tài khoản"
                  />
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    placeholder="Nhập email"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label className="form-label fw-bold">Họ</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    placeholder="Nhập họ"
                  />
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label className="form-label fw-bold">Tên</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    placeholder="Nhập tên"
                  />
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="form-label fw-bold">Vai trò</label>
                <select
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  className="form-select shadow-sm"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 shadow w-50"
                >
                  {isSaving ? <LoaderButton /> : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="text-center p-5">
          <h3 className="text-muted">Không có dữ liệu người dùng!</h3>
        </div>
      )}
    </div>
  </div>
</div>

  );
}

export default UserDetail;
