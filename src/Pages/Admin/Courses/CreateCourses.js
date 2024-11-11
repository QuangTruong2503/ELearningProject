import React, { useEffect } from "react";
import { useState } from "react";
import ChooseImages from "../../../Component/Images/ChooseImages";
import LoaderButton from '../../../Component/Loader/LoaderButton.js';
import { ToastContainer, toast } from "react-toastify";
import { fetchCreateCourse } from "../../../API/coursesAPI";
import { fetchVerifyLogin } from "../../../Helpers/VerifyLogin";
import { fetchSubjects } from "../../../API/subjectsAPI";
function CreateCourses() {
  //Trạng thái upload nếu true sẽ tiến hành upload lên cloudinary
  const [uploadImage, setUploadImage] = useState(false);
  const [courseData, setCourseData] = useState({
    course_name: "",
    is_public: true,
    teacher_id: "",
    subject_id: "",
    thumbnail: "",
    description: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [canInsert, setCanInsert] = useState(false);
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //Gán đường dẫn ảnh vào biến courseData
  const handleGetImage = (data) => {
    setUploadImage(false);
    if (data && data.length > 0 && data[0].thumbnail) {
      const url = data[0].thumbnail;
      setCourseData((prev) => ({
        ...prev,
        thumbnail: url,
      }));
      setCanInsert(true);
    } else {
      console.warn("No valid thumbnail data provided.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadImage(true);
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
    //Lấy dữ liệu Subjects
    const handleGetSubjects = async () => {
      const result = await fetchSubjects();
      if (result !== undefined) {
        setSubjects(result);
      }
    };
    handleGetSubjects();
    handleVerifyLogin();
  }, []);
  //Thêm dữ liệu khóa học nếu đã có url ảnh
  useEffect(() =>{
    if(canInsert === true)
    {
      const handleInsertCourse = async () => {
        setUploadImage(false);
        const result = await fetchCreateCourse(courseData);
        if (result !== undefined) {
          if (result.success === true)
          {
            toast.success(result.message);
            setTimeout(() =>{
              window.location.reload();
            }, 1500)
          }
          else {
            toast.warning(result.message);
          }
        }
      };
      handleInsertCourse();
    }
  }, [canInsert, courseData])
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
          <select
            className="form-control"
            id="subject_id"
            name="subject_id"
            required
            value={courseData.subject_id}
            onChange={handleChangeData}
          >
            <option value={""} disabled>
              Chọn môn học
            </option>
            {subjects.length !== 0 &&
              subjects.map((item, index) => (
                <option value={item.subject_id} key={index}>
                  {item.subject_name}
                </option>
              ))}
          </select>
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
            uploadSuccess={handleGetImage}
          />
        </div>
        <div className="text-center">
          {isLoading ? (
            <button disabled type="submit" className="btn btn-primary">
              <LoaderButton />
            </button>
          ) : (
            <button  type="submit" className="btn btn-primary">
              Tạo mới
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateCourses;
