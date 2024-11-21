import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import { fetchLessonsByCourse } from "../../../API/lessonsAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import {
  faArrowRotateLeft,
  faPencil,
  faPlus,
  faSave,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function Lessons() {
  const { courseID } = useParams();
  const [lessons, setLessons] = useState([]);

  const [editingLessonId, setEditingLessonId] = useState(null);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [reload, setReload] = useState(false)

  //Hàm load lại dữ liệu
  const handleRefreshData = () =>{
    setReload(!reload);
  }
  //Thêm khóa học mới vào data
  const handleAddLesson = () =>{
    const newLesson = {
      lessonData: {
        lesson_ID: uuidv4(),
        lesson_Name: "Bài học mới",
        course_ID: courseID,
        created_At: new Date().toISOString(),
      },
      lessonLink: [],
    };
    setLessons([
      ...lessons,
      newLesson
    ])
  }
  //Lấy dữ liệu bài học
  useEffect(() => {
    const handleGetLessons = async () => {
      const result = await fetchLessonsByCourse(courseID);
      if (result !== null) {
        setLessons(result);
      }
    };
    handleGetLessons();
  }, [courseID, reload]);
  useEffect(() =>{
    console.log(lessons)
  }, [lessons])
  return (
    <div>
      <h3 className="text-center mb-4">Chi Tiết Bài Học</h3>
      <div className="accordion" id="accordionExample">
        {lessons.length > 0 &&
          lessons.map((item, index) => (
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button">
                  <strong>{item.lessonData.lesson_Name}</strong>
                  <div className="d-flex justify-content-end gap-1 mx-2">
                    <button type="button" className="btn btn-outline-light text-success">
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button type="button" className="btn btn-outline-light text-danger">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ol className="list-group">
                    {item.lessonLink !== undefined &&
                      item.lessonLink.map((lesLink, lesLinkIndex) => (
                        <li
                          className="list-group-item d-flex align-items-center justify-content-between flex-column flex-lg-row"
                          key={lesLinkIndex}
                        >
                          <div className="d-flex flex-column">
                          <p>{lesLink.link_Name}</p>
                          <p className="overflow-hidden" style={{maxHeight: '50px'}}>{lesLink.link_URL}</p></div>
                          <div className="d-flex justify-content-end gap-1">
                            <button className="btn btn-light text-success">
                              <FontAwesomeIcon icon={faPencil} />
                            </button>
                            <button className="btn btn-light text-danger">
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="d-flex justify-content-start">
        {/* Thêm dữ liệu bài học mới */}
        <button className="btn btn-success my-2" onClick={() => handleAddLesson()}>
          Thêm bài học <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="d-flex justify-content-center gap-2 mt-5 flex-column flex-lg-row">
        <button className="btn btn-light" onClick={() => handleRefreshData()}>
          <FontAwesomeIcon icon={faArrowRotateLeft} /> Hủy thay đổi
        </button>
        <button className="btn btn-outline-primary">
          <FontAwesomeIcon icon={faSave} /> Lưu thay đổi
        </button>
      </div>
    </div>
  );
}

export default Lessons;
