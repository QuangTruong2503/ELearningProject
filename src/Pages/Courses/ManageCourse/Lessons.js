import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchLessonsByCourse,
  fetchUpdateLessonAndLessonLinks,
} from "../../../API/lessonsAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import {
  faArrowRotateLeft,
  faPencil,
  faPlus,
  faSave,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import SpinnerLoader from "../../../Component/Loader/SpinnerLoader";
import { toast } from "react-toastify";
import LoaderButton from "../../../Component/Loader/LoaderButton";

function Lessons() {
  const { courseID } = useParams();
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [editingLessonId, setEditingLessonId] = useState(null);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [reload, setReload] = useState(false);

  //Hàm load lại dữ liệu
  const handleRefreshData = () => {
    setReload(!reload);
  };
  //Thêm khóa học mới vào data
  const handleAddLesson = () => {
    const newlessonID = uuidv4();
    const newLesson = {
      lessonData: {
        lesson_ID: newlessonID,
        lesson_Name: "Bài học mới",
        course_ID: courseID,
      },
      lessonLink: [
        {
          link_ID: uuidv4(), // Sử dụng timestamp làm ID tạm
          link_Name: "Tên Đường dẫn mới",
          link_URL: "https://example.com",
          lesson_ID: newlessonID,
        },
      ],
    };
    setLessons([...lessons, newLesson]);
  };

  //Thêm link bài học
  const addEmptyLink = (lessonId) => {
    const newLink = {
      link_ID: uuidv4(), // Sử dụng timestamp làm ID tạm
      link_Name: "Tên Đường dẫn mới",
      link_URL: "https://example.com",
      lesson_ID: lessonId,
    };

    setLessons(
      lessons.map((lesson) =>
        lesson.lessonData.lesson_ID === lessonId
          ? { ...lesson, lessonLink: [...lesson.lessonLink, newLink] }
          : lesson
      )
    );
  };

  // Cập nhật tên bài học
  const updateLessonName = (lessonId, newName) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.lessonData.lesson_ID === lessonId
          ? {
              ...lesson,
              lessonData: { ...lesson.lessonData, lesson_Name: newName },
            }
          : lesson
      )
    );
    setEditingLessonId(null); // Dừng chỉnh sửa
  };
  //Cập nhật đường dẫn
  const updateLink = (lessonId, linkId, updatedLinkValue) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.lessonData.lesson_ID === lessonId
          ? {
              ...lesson,
              lessonLink: lesson.lessonLink.map((link) =>
                link.link_ID === linkId
                  ? { ...link, ...updatedLinkValue }
                  : link
              ),
            }
          : lesson
      )
    );
  };
  //Xóa bài học
  const handleDeleteLesson = (lessonID) => {
    const lessonAfterDelete = lessons.filter(
      (lesson) => lesson.lessonData.lesson_ID !== lessonID
    );
    setLessons(lessonAfterDelete);
  };
  // Xóa liên kết
  const deleteLink = (lessonId, linkId) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.lessonData.lesson_ID === lessonId
          ? {
              ...lesson,
              lessonLink: lesson.lessonLink.filter(
                (link) => link.link_ID !== linkId
              ),
            }
          : lesson
      )
    );
  };

  //Hàm cập nhật dữ liệu đã thay đổi
  const handleSubmitChange = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const result = await fetchUpdateLessonAndLessonLinks(lessons);
    if (result !== null) {
      toast.success(result.message);
      setIsSaving(false);
    }
  };

  //Lấy dữ liệu bài học
  useEffect(() => {
    const handleGetLessons = async () => {
      const result = await fetchLessonsByCourse(courseID);
      if (result !== null) {
        setLessons(result);
        setIsLoading(false);
      }
    };
    handleGetLessons();
  }, [courseID, reload]);
  useEffect(() => {
    console.log(lessons);
  }, [lessons]);
  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div>
          <h3 className="text-center mb-4">Chi Tiết Bài Học</h3>
          <div className="accordion" id="accordionExample">
            {lessons.length > 0 &&
              lessons.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <div className="accordion-button collapsed">
                      {/* Hiển thị ô nhập khi nhấn chỉnh sửa */}
                      {editingLessonId === item.lessonData.lesson_ID ? (
                        <div className="col-lg-6">
                          <input
                            className="form-control"
                            type="text"
                            defaultValue={item.lessonData.lesson_Name}
                            onBlur={(e) =>
                              updateLessonName(
                                item.lessonData.lesson_ID,
                                e.target.value
                              )
                            }
                            autoFocus
                          />
                        </div>
                      ) : (
                        <strong>{item.lessonData.lesson_Name}</strong>
                      )}

                      <div className="d-flex justify-content-end gap-1 mx-2">
                        {/* Nút edit */}
                        <button
                          className="btn btn-outline-light text-success"
                          onClick={() =>
                            setEditingLessonId(item.lessonData.lesson_ID)
                          }
                        >
                          <FontAwesomeIcon icon={faPencil} />
                        </button>
                        {/* Nút xóa */}
                        <button
                          className="btn btn-outline-light text-danger"
                          onClick={() =>
                            handleDeleteLesson(item.lessonData.lesson_ID)
                          }
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </div>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        {item.lessonLink !== undefined &&
                          item.lessonLink.map((lesLink, lesLinkIndex) => (
                            <li
                              className="list-group-item d-flex align-items-center justify-content-between flex-column flex-lg-row flex-md-row"
                              key={lesLinkIndex}
                            >
                              {lesLink.link_ID === editingLinkId ? (
                                <div className="d-flex flex-column col-lg-6 gap-2">
                                  <input
                                    className="form-control"
                                    type="text"
                                    defaultValue={lesLink.link_Name}
                                    onBlur={(e) =>
                                      updateLink(
                                        item.lessonData.lesson_ID,
                                        lesLink.link_ID,
                                        { link_Name: e.target.value }
                                      )
                                    }
                                    autoFocus
                                  />
                                  <input
                                    className="form-control"
                                    type="text"
                                    defaultValue={lesLink.link_URL}
                                    onBlur={(e) =>
                                      updateLink(
                                        item.lessonData.lesson_ID,
                                        lesLink.link_ID,
                                        { link_URL: e.target.value }
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                <div className="d-flex flex-column">
                                  <p>{lesLink.link_Name}</p>
                                  <a
                                    href={lesLink.link_URL}
                                    className="overflow-hidden"
                                    style={{ maxHeight: "50px" }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {lesLink.link_URL}
                                  </a>
                                </div>
                              )}
                              <div className="d-flex justify-content-end gap-1">
                                {/* Nút edit link */}
                                {editingLinkId === lesLink.link_ID ? (
                                  <button
                                    className="btn btn-light text-success"
                                    onClick={() => setEditingLinkId(null)}
                                  >
                                    <FontAwesomeIcon icon={faSave} />
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-light text-success"
                                    onClick={() =>
                                      setEditingLinkId(lesLink.link_ID)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faPencil} />
                                  </button>
                                )}
                                {/* Nút xóa link */}
                                <button
                                  className="btn btn-light text-danger"
                                  onClick={() =>
                                    deleteLink(
                                      item.lessonData.lesson_ID,
                                      lesLink.link_ID
                                    )
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                              </div>
                            </li>
                          ))}
                        <div className="d-flex justify-content-start">
                          {/* Thêm dữ liệu link bài học mới */}
                          <button
                            className="btn text-success mt-3"
                            onClick={() =>
                              addEmptyLink(item.lessonData.lesson_ID)
                            }
                          >
                            Thêm đường dẫn <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="d-flex justify-content-start">
            {/* Thêm dữ liệu bài học mới */}
            <button
              className="btn btn-success my-2"
              onClick={() => handleAddLesson()}
            >
              Thêm bài học <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <form
            className="d-flex justify-content-center gap-2 mt-5 flex-column flex-lg-row"
            onSubmit={handleSubmitChange}
          >
            <button
              className="btn btn-light"
              type="button"
              onClick={() => handleRefreshData()}
            >
              <FontAwesomeIcon icon={faArrowRotateLeft} /> Hủy thay đổi
            </button>
            {isSaving ? (
              <button className="btn btn-primary">
                <LoaderButton />
              </button>
            ) : (
              <button className="btn btn-outline-primary" type="submit">
                <FontAwesomeIcon icon={faSave} /> Lưu thay đổi
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default Lessons;
