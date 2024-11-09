import React, { useEffect } from "react";
import { useState } from "react";
import ChooseImages from "../../../Component/Images/ChooseImages";
import { ToastContainer, toast } from "react-toastify";
import { fetchCreateCourse } from "../../../API/coursesAPI";
import { fetchVerifyLogin } from "../../../Helpers/VerifyLogin";
function CreateCourses() {
  //Trạng thái upload
  const [uploadImage, setUploadImage] = useState(false);
  const [courseData, setCourseData] = useState({
    course_name: "",
    is_public: true,
    teacher_id: "",
    subject_id: "",
    thumbnail: "",
    description: "",
  });
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleGetImage = (data) => {
    setCourseData((prev) => ({
      ...prev,
      thumbnail: data[0].thumbnail,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUploadImage(true);
  };
  const handleInsertCourse = async () => {
    setUploadImage(false);
    const result = await fetchCreateCourse(courseData);
    if (result !== undefined) {
      if (result.success === true) toast.success(result.message);
      else {
        toast.warning(result.message);
      }
    }
  };
  //Kiểm tra đăng nhập
  useEffect(() => {
    const handleVerifyLogin = async () => {
      const data = await fetchVerifyLogin();
      if (data !== undefined) {
        setCourseData((prev) => ({
          ...prev,
          teacher_id: data.userID,
        }));
      }
    };
    handleVerifyLogin();
  }, []);
  return (
    <div className="container my-5" style={{ width: "90%" }}>
      <h2 className="text-center mb-4">Tạo Khóa Học</h2>
      <form className="row row-gap-3" onSubmit={handleSubmit}>
        <div className="form-group col-md-6 col-12">
          <label htmlFor="course_name">Tên khóa học</label>
          <input
            type="text"
            className="form-control"
            id="course_name"
            name="course_name"
            ma="255"
            required
            onChange={handleChangeData}
          />
        </div>

        <div className="form-group col-md-6 col-12">
          <label htmlFor="is_public">Trạng thái</label>
          <select
            className="form-control"
            id="is_public"
            name="is_public"
            onChange={handleChangeData}
            value={true}
          >
            <option value={true}>Công khai</option>
            <option value={false}>Riêng tư</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-12">
          <label htmlFor="subject_id">Môn học</label>
          <input
            type="text"
            className="form-control"
            id="subject_id"
            name="subject_id"
            maxLength="255"
            required
            onChange={handleChangeData}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            onChange={handleChangeData}
          ></textarea>
        </div>
        <div className="form-group">
          <ChooseImages
            category="courses"
            upload={uploadImage}
            uploadSuccess={handleInsertCourse}
            images={handleGetImage}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Tạo mới
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateCourses;
