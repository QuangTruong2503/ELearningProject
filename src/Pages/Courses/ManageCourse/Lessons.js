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

  const handleRefreshData = () => setReload(!reload);

  const handleAddLesson = () => {
    const newLessonId = uuidv4();
    const newLesson = {
      lessonData: {
        lesson_ID: newLessonId,
        lesson_Name: "New Lesson",
        course_ID: courseID,
      },
      lessonLink: [
        {
          link_ID: uuidv4(),
          link_Name: "New Link Name",
          link_URL: "https://example.com",
          lesson_ID: newLessonId,
        },
      ],
    };
    setLessons([...lessons, newLesson]);
  };

  const addEmptyLink = (lessonId) => {
    const newLink = {
      link_ID: uuidv4(),
      link_Name: "New Link Name",
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
    setEditingLessonId(null);
  };

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

  const handleDeleteLesson = (lessonId) => {
    setLessons(
      lessons.filter((lesson) => lesson.lessonData.lesson_ID !== lessonId)
    );
  };

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

  const handleSubmitChange = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const result = await fetchUpdateLessonAndLessonLinks(lessons);
    if (result) {
      toast.success(result.message);
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const handleGetLessons = async () => {
      const result = await fetchLessonsByCourse(courseID);
      if (result) {
        setLessons(result);
        setIsLoading(false);
      }
    };
    handleGetLessons();
  }, [courseID, reload]);

  return (
    <div className="container my-4">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <SpinnerLoader />
        </div>
      ) : (
        <>
          <div className="mb-4 text-center">
            <h3>Lesson Details</h3>
          </div>
          <button className="btn btn-primary mb-3" onClick={handleAddLesson}>
              Thêm bài học <FontAwesomeIcon icon={faPlus} />
            </button>
          <div className="accordion" id="lessonAccordion">
            {lessons.map((lesson, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    {editingLessonId === lesson.lessonData.lesson_ID ? (
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={lesson.lessonData.lesson_Name}
                        onBlur={(e) =>
                          updateLessonName(
                            lesson.lessonData.lesson_ID,
                            e.target.value
                          )
                        }
                        autoFocus
                      />
                    ) : (
                      lesson.lessonData.lesson_Name
                    )}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#lessonAccordion"
                >
                  <div className="accordion-body">
                    <ul className="list-group">
                      {lesson.lessonLink.map((link, linkIndex) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center"
                          key={linkIndex}
                        >
                          {editingLinkId === link.link_ID ? (
                            <>
                              <input
                                className="form-control mb-2"
                                type="text"
                                defaultValue={link.link_Name}
                                onBlur={(e) =>
                                  updateLink(
                                    lesson.lessonData.lesson_ID,
                                    link.link_ID,
                                    {
                                      link_Name: e.target.value,
                                    }
                                  )
                                }
                              />
                              <input
                                className="form-control"
                                type="text"
                                defaultValue={link.link_URL}
                                onBlur={(e) =>
                                  updateLink(
                                    lesson.lessonData.lesson_ID,
                                    link.link_ID,
                                    {
                                      link_URL: e.target.value,
                                    }
                                  )
                                }
                              />
                            </>
                          ) : (
                            <>
                              <span>{link.link_Name}</span>
                              <a
                                href={link.link_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.link_URL}
                              </a>
                            </>
                          )}
                          <div>
                            <button
                              className="btn btn-sm btn-outline-success mx-1"
                              onClick={() =>
                                setEditingLinkId(
                                  editingLinkId === link.link_ID
                                    ? null
                                    : link.link_ID
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faPencil} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                deleteLink(
                                  lesson.lessonData.lesson_ID,
                                  link.link_ID
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </li>
                      ))}
                      <li className="list-group-item">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() =>
                            addEmptyLink(lesson.lessonData.lesson_ID)
                          }
                        >
                          Thêm đường dẫn <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/* Edit and Delete Lesson Buttons */}
                  <div className="text-end mt-3">
                    <button
                      className="btn btn-outline-secondary me-2"
                      onClick={() =>
                        setEditingLessonId(
                          editingLessonId === lesson.lessonData.lesson_ID
                            ? null
                            : lesson.lessonData.lesson_ID
                        )
                      }
                    >
                      {editingLessonId === lesson.lessonData.lesson_ID ? (
                        <>
                          Lưu <FontAwesomeIcon icon={faSave} />
                        </>
                      ) : (
                        <>
                          Sửa <FontAwesomeIcon icon={faPencil} />
                        </>
                      )}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDeleteLesson(lesson.lessonData.lesson_ID)
                      }
                    >
                      Delete <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              className="btn btn-outline-secondary"
              onClick={handleRefreshData}
            >
              Hủy thay đổi <FontAwesomeIcon icon={faArrowRotateLeft} />
            </button>
            {isSaving ? (
              <button className="btn btn-success ms-2">
                <LoaderButton />
              </button>
            ) : (
              <button
                className="btn btn-success ms-2"
                onClick={handleSubmitChange}
              >
                Lưu thay đổi <FontAwesomeIcon icon={faSave} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Lessons;
