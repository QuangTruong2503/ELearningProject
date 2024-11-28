import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchExamByID, fetchUpdateExam } from "../../../API/examsAPI";
import ExamQuestions from "../../../Component/ManageCourse/ExamQuestions";
import { toast } from "react-toastify";
import LoaderButton from "../../../Component/Loader/LoaderButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function EditExam() {
  const { examID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [examDetail, setExamDetail] = useState({
    exam_id: "",
    exam_name: "",
    total_score: 0,
    exam_time: 0,
    hide_result: false,
    created_at: "",
    finished_at: "",
    course_id: "",
  });
  // Hàm xử lý thay đổi dữ liệu
  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setExamDetail((prevData) => ({
      ...prevData,
      [id]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
          ? e.target.checked
          : value,
    }));
  };

  useEffect(() => {
    if (examID !== undefined) {
      const handleGetData = async () => {
        const resultExam = await fetchExamByID(examID);
        if (resultExam !== null) {
          setExamDetail(resultExam);
          console.log(resultExam);
        }
      };
      handleGetData();
    }
  }, [examID, reload]);

  //Cập nhật
  const handleUpdateExam = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await fetchUpdateExam(examDetail);
    if (result !== null) {
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.warning(result.message);
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-start">
        <button
          className="btn text-primary d-flex align-items-center gap-1"
          onClick={() => window.history.back()}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
        </button>
      </div>
      <h3 className="mb-4 text-center">Chỉnh Sửa Bài Kiểm Tra</h3>
      <form
        className="d-flex flex-column gap-1"
        onSubmit={handleUpdateExam}
        onReset={() => setReload(!reload)}
      >
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
              required
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
              required
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
              required
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
              type="text"
              id="created_at"
              className="form-control"
              value={new Date(examDetail.created_at).toLocaleString()}
              disabled
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
              value={(examDetail.finished_at).slice(0, 16)}
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
              required
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
          {/* Nút lưu */}
          {isLoading ? (
            <button type="button" disabled className="btn btn-primary me-2">
              <LoaderButton />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary me-2">
              Lưu Thay Đổi
            </button>
          )}
        </div>
      </form>
      {/* Questions */}
      <ExamQuestions examData={examDetail} />
    </div>
  );
}

export default EditExam;
