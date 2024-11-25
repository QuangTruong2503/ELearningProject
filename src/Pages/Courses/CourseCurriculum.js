import React from "react";
import { NavLink } from "react-router-dom";

function CourseCurriculum({ attended, lessons = [], exams = [] }) {
  return (
    <div className="accordion course-detail--page" id="accordionCurriculum">
      {/* Lessons */}
      {lessons.length > 0 &&
        lessons.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              >
                <strong>{item.lessonData.lesson_Name}</strong>
              </button>
            </h2>

            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${
                index === 0 ? "show" : ""
              }`}
              data-bs-parent="#accordionCurriculum"
            >
              {/* Nếu đã tham gia khóa học thì hiển thị khóa học */}
              <div className="accordion-body">
                {(attended) && (
                  <ol className="list-group list-group-numbered">
                    {item.lessonLink !== undefined &&
                      item.lessonLink.map((lesLink, lesLinkIndex) => (
                        <li className="list-group-item" key={lesLinkIndex}>
                          <NavLink target="_blank" to={lesLink.link_URL}>
                            {lesLink.link_Name}
                          </NavLink>
                        </li>
                      ))}
                  </ol>
                )}
                {!attended && (
                  <ol className="list-group">
                    {item.lessonLink !== undefined &&
                      item.lessonLink.map((lesLink, lesLinkIndex) => (
                        <li className="list-group-item" key={lesLinkIndex}>
                          {lesLink.link_Name}
                        </li>
                      ))}
                  </ol>
                )}
              </div>
            </div>
          </div>
        ))}

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <strong>Các bài kiểm tra</strong>
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionCurriculum"
        >
          <div className="accordion-body">
            <ol className="list-group">
              {exams.length > 0 &&
                exams.map((item, index) => (
                  <li className="list-group-item" key={index}>
                    <div className="d-flex justify-content-between">
                      {attended ? (
                        <NavLink to={`/exam/${item.exam_id}`}>{item.exam_name}</NavLink>
                      ) : (
                        <p>{item.exam_name}</p>
                      )}
                      <span>{item.exam_time} phút</span>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCurriculum;
