import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { fetchExamsByCourse } from "../../../API/examsAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Exams() {
  const { courseID } = useParams();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  //Lấy dữ liệu exam
  useEffect(() => {
    if (courseID !== undefined) {
      const handleGetExams = async () => {
        const result = await fetchExamsByCourse(courseID);
        if (result !== null) {
          setExams(result);
        }
      };
      handleGetExams();
    }
  }, [courseID]);
  return (
    <div>
      <h3 className="text-center mb-2">Các Bài Thi Trong Khóa Học</h3>
      <div className="container p-5">
        <ul className="list-group list-group-numbered row">
          {exams.length > 0 &&
            exams.map((item, index) => (
              <li
                className="list-group-item d-flex align-items-center gap-2 col-6"
                style={{ width: "fit-content" }}
                key={index}
              >
                <div>
                  <strong>{item.exam_name}</strong>
                </div>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-link"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontSize: "18px" }}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item btn text-success d-flex align-items-center gap-1"
                        onClick={() => navigate(`detail/${item.exam_id}`)}
                      >
                        <span>Chỉnh sửa</span>
                        <span>
                          <FontAwesomeIcon icon={faPen} />
                        </span>
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item btn text-danger d-flex align-items-center gap-1">
                        <span>Xóa</span>
                        <span>
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Exams;
