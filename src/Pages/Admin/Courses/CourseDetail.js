import React, { useEffect, useState } from "react";
import SpinnerLoader from "../../../Component/Loader/SpinnerLoader.js";
import LoaderButton from "../../../Component/Loader/LoaderButton.js";
import { fetchCourseByID, fetchUpdateCourse } from "../../../API/coursesAPI.js";
import { fetchSubjects } from "../../../API/subjectsAPI.js";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { fetchUploadCloudinaryOneImage } from "../../../Helpers/UploadImageToCloudinary.js";
function UserDetail({ ID, onClose, onSave }) {
  const [formData, setFormData] = useState({
    course_id: "",
    course_name: "",
    description: "",
    invite_code: "",
    is_public : "",
    thumbnail: "",
    teacher_id: "",
    teacherFullName: "",
    subject_id: "",
  });
  const [selectedImage, setSelectedImage] = useState('')
  const [subjects, setSubjects] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
    //Cập nhật dữ liệu
    const handleUpdateCourse = async () =>{
      const result = await fetchUpdateCourse(formData);
      if(result !== undefined)
      {
        toast.success(result.message);
        setIsSaving(false)
        onSave();        
      }
    }
  //Cập nhật dữ liệu người dùng
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    if(selectedImage !== '')
    {
      const imageUploaded = await fetchUploadCloudinaryOneImage(selectedImage, 'Courses');
      if(imageUploaded !== null)
      {
        console.log(imageUploaded)
        const thumbnail = imageUploaded.thumbnail;
        setFormData((prev) => ({
          ...prev,
          thumbnail: thumbnail,
        }));
        setUploadSuccess(true);
      }
    }
    else{
      handleUpdateCourse();
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024;
      if(fileSize > 3)
      {
        toast.warning('File ảnh không được vượt quá 3MB')
        return;
      }
      const imageUrl = URL.createObjectURL(file);
          setFormData((prev) => ({
            ...prev,
            thumbnail: imageUrl,
          }));
          setSelectedImage(file);
    }
  };
  //Cập nhật sau khi upload ảnh
  useEffect(() =>{
    if(uploadSuccess)
    {
      //Cập nhật dữ liệu
    const handleUpdateCourse = async () =>{
      const result = await fetchUpdateCourse(formData);
      if(result !== undefined)
      {
        toast.success(result.message);
        setIsSaving(false)
        onSave();      
        setUploadSuccess(false);  
      }
    }
    handleUpdateCourse();
    }
  },[uploadSuccess, formData, onSave])
  //Lấy dữ liệu
  useEffect(() => {
    //Lấy dữ liệu khóa học theo ID
    const handleFetchCourseByID = async () => {
      const result = await fetchCourseByID(ID);
      if (result === undefined) {
        setIsLoading(false);
        return;
      }
      console.log(result);
      const data = result;
      setFormData({
        course_id: data.courseID,
        course_name: data.courseName,
        description: data.description,
        invite_code: data.inviteCode,
        is_public: data.isPublic,
        thumbnail: data.thumbnail,
        teacher_id: data.teacherID,
        teacherFullName: data.teacherFullName,
        subject_id: data.subjectID,
      });
      setIsLoading(false);
    };
    //Lấy dữ liệu các môn học
    const handleGetSubjects = async () => {
      const result = await fetchSubjects();
      if (result !== undefined) {
        setSubjects(result);
      }
    };
    handleFetchCourseByID();
    handleGetSubjects();
  }, [ID]);
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="modal show d-block modal-background" tabIndex="-1">
      <div className="w-50 my-5 mx-auto">
        {isLoading && (
          <div className="modal-content">
            <SpinnerLoader />
          </div>
        )}
        {!isLoading && (
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Thông Tin Khóa Học</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <label>Tên khóa học</label>
                    <input
                      type="text"
                      name="course_name"
                      value={formData.course_name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <label>Mã mời</label>
                    <input
                      type="text"
                      name="invite_code"
                      value={formData.invite_code}
                      readOnly
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group mb-3 col-md-6">
                    <label>Giáo viên</label>
                    <input
                      type="text"
                      value={formData.teacherFullName}
                      disabled
                      className="form-control"
                    />
                  </div>

                  <div className="form-group mb-3 col-md-6">
                    <label>Môn học</label>
                    <select
                      className="form-control"
                      id="subject_id"
                      name="subject_id"
                      required
                      value={formData.subject_id}
                      onChange={handleChange}
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
                  <div className="form-group mb-3 col-md-6 d-flex align-items-center">
                    <label htmlFor="isPublic" className="me-2">
                      Công Khai
                    </label>
                    <input
                      type="checkbox"
                      name="is_public"
                      id="isPublic"
                      checked={formData.is_public}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        })
                      }
                      className="form-check-input"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-12">
                    <label>Mô tả</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-12 d-flex flex-column">
                    <label>Hình ảnh</label>
                    <div className="d-flex align-items-end">
                      <img
                        style={{ width: "200px", height: '150px' }}
                        src={formData.thumbnail}
                        alt="Khóa học"
                      />
                      <label htmlFor="uploadImage" className="btn btn-outline-success d-inline-block mx-2">Chọn ảnh <FontAwesomeIcon icon={faPlus}/></label>
                      <input id="uploadImage" type="file" accept="image/*" className="d-none" onChange={handleImageChange} />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary p-2 w-50">
                    {isSaving ? <LoaderButton /> : "Lưu thay đổi"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
