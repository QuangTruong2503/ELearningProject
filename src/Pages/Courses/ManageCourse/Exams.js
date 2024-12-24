import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchDeleteExam,
  fetchExamsByCourse,
  fetchInsertNewExam,
} from "../../../API/examsAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPen,
  faPlus,
  faTable,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import LoaderButton from "../../../Component/Loader/LoaderButton.js";
import DeleteModal from "../../../Component/Modal/DeleteModal.js";

function Exams() {
  const { courseID } = useParams();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [reload, setReload] = useState();
  const [deleteExam, setDeleteExam] = useState(null);
  //Lấy dữ liệu exam
  useEffect(() => {
    if (courseID !== undefined) {
      const handleGetExams = async () => {
        const result = await fetchExamsByCourse(courseID);
        if (result !== null) {
          setExams(result);
          console.log(result);
        }
      };
      handleGetExams();
    }
  }, [courseID, reload]);
  const handleAddExam = async () => {
    setIsCreating(true);
    const result = await fetchInsertNewExam(courseID);
    if (result !== null) {
      toast.success(result.message);
      setIsCreating(false);
      setReload(!reload);
    }
  };
  const handleDeleteExam = async () => {
    try {
      const result = await toast.promise(
        fetchDeleteExam(deleteExam),
        {
          pending: "Tiến hành xóa bài thi...",
          success: "Xóa bài thi thành công",
          error: "Gặp lỗi khi xóa",
        }
      );
  
      if (result.success) {
        setReload(!reload);
      } else {
        throw new Error("Xóa thất bại"); // Ném lỗi để `toast.promise` bắt được
      }
    } catch (error) {
      console.error("Error deleting exam:", error); // Đăng nhập lỗi để debug
    }
  };
  
  return (
    <div>
      <h3 className="text-center mb-2">Các Bài Thi Trong Khóa Học</h3>
      <div className="d-flex justify-content-end">
        {/* Thêm dữ liệu bài học mới */}
        {isCreating ? (
          <button className="btn btn-success my-2">
            <LoaderButton />
          </button>
        ) : (
          <button
            className="btn btn-success my-2"
            onClick={() => handleAddExam()}
          >
            Thêm bài thi <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </div>
      <div className="container mt-4">
        {/* List of Exams */}
        <ul className="list-group list-group-flush">
          {exams.length > 0 ? (
            exams.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center mb-3 shadow-sm rounded"
                style={{ backgroundColor: "#f8f9fa", padding: "15px" }}
              >
                {/* Exam Name and Action */}
                <div className="d-flex justify-content-between w-100">
                  {/* Exam Name */}
                  <div className="d-flex flex-column">
                    <strong className="h6 text-dark">{item.exam_name}</strong>
                  </div>

                  {/* Dropdown Button */}
                  <div className="dropdown">
                    <button
                      className="btn btn-link text-dark"
                      type="button"
                      id={`dropdownMenuButton-${item.exam_id}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdownMenuButton-${item.exam_id}`}
                    >
                      {/* Edit Button */}
                      <li>
                        <button
                          className="dropdown-item text-success d-flex align-items-center gap-2"
                          onClick={() => navigate(`detail/${item.exam_id}`)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                          <span>Chỉnh sửa</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center gap-2"
                          onClick={() => navigate(`results/${item.exam_id}`)}
                        >
                          <FontAwesomeIcon icon={faTable} />
                          <span>Bài kiểm tra</span>
                        </button>
                      </li>
                      {/* Delete Button */}
                      <li>
                        <button
                          className="dropdown-item text-danger d-flex align-items-center gap-2"
                          onClick={() => setDeleteExam(item.exam_id)}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          <span>Xóa</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center">
              Không có bài thi nào
            </li>
          )}
        </ul>
      </div>
      <DeleteModal
      title={"XÓA DỮ LIỆU BÀI THI"}
      content={
        "Bạn có chắc chắn muốn xóa bài thi này không? Tất cả dữ liệu liên quan đến câu hỏi, các bài làm của học sinh sẽ bị xóa."
      }
      onDelete={handleDeleteExam}
      onClose={() => setDeleteExam(null)}
    />
    </div>
  );
}

export default Exams;
