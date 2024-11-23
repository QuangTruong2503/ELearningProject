import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchExamByID } from "../../../API/examsAPI";
import ExamQuestions from "../../../Component/ManageCourse/ExamQuestions";

function EditExam() {
  const { examID } = useParams();
  const [examDetail, setExamDetail] = useState({
    exam_id: "",
    exam_name: "",
    total_score: 0,
    exam_time: 0,
    hide_result: false,
    created_at: "",
    finished_at: '',
    course_id: "",
  });
  // Hàm xử lý thay đổi dữ liệu
  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setExamDetail((prevData) => ({
      ...prevData,
      [id]: type === "number" ? Number(value) : type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", examDetail);
  };
  useEffect(() => {
    if(examID !== undefined)
    {
        const handleGetData = async () =>{
            const resultExam = await fetchExamByID(examID);
            if(resultExam !== null)
            {
                setExamDetail(resultExam)
            }
        }
        handleGetData();
    }
  }, [examID]);
  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Chỉnh Sửa Bài Kiểm Tra</h3>
      <form className="d-flex flex-column gap-1" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="exam_name" className="form-label">
              Tên Kiểm Tra
            </label>
            <input
              type="text"
              id="exam_name"
              className="form-control"
              value={examDetail.exam_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="total_score" className="form-label">
              Tổng Điểm
            </label>
            <input
              type="number"
              id="total_score"
              className="form-control"
              value={examDetail.total_score}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="exam_time" className="form-label">
              Thời Gian Làm Bài (phút)
            </label>
            <input
              type="number"
              id="exam_time"
              className="form-control"
              value={examDetail.exam_time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="created_at" className="form-label">
              Ngày Tạo
            </label>
            <input
              type="datetime-local"
              id="created_at"
              className="form-control"
              value={examDetail.created_at}
              readOnly
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="finished_at" className="form-label">
              Ngày Kết Thúc
            </label>
            <input
              type="datetime-local"
              id="finished_at"
              className="form-control"
              value={examDetail.finished_at}
              onChange={handleChange}
            />
            <small>
              Học sinh sẽ không thể truy cập vào bài thi sau khi kết thúc.
            </small>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="hide_result" className="form-label">
              Kết Quả
            </label>
            <select
              id="hide_result"
              className="form-select"
              value={examDetail.hide_result}
              onChange={(e) =>
                setExamDetail((prevData) => ({
                  ...prevData,
                  hide_result: e.target.value === "true",
                }))
              }
            >
              <option value="false">Hiển Thị</option>
              <option value="true">Ẩn</option>
            </select>
            <small>
              Kết quả sau khi hoàn thành kiểm tra sẽ hiện thị hoặc ẩn.
            </small>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-2">
          <button type="reset" className="btn btn-secondary">
            Đặt Lại
          </button>
          <button type="submit" className="btn btn-primary me-2">
            Lưu Thay Đổi
          </button>
        </div>
      </form>
      {/* Questions */}
      <ExamQuestions examData={examDetail}/>
    </div>
  );
}

export default EditExam;
