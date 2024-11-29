import React from "react";

function CourseCard({ course }) {
  const courseData = {
    courseID: course.courseID,
    courseName: course.courseName,
    description: course.description,
    inviteCode: course.inviteCode,
    isPublic: course.isPublic,
    createdAt: course.createdAt,
    thumbnail: course.thumbnail,
    teacherID: course.teacherID,
    teacherFullName: course.teacherFullName,
    subjectID: course.subjectID,
    subjectName: course.subjectName,
  };
  return (
    <div className="card col-6 col-md-4 col-lg-3">
      <img src={courseData.thumbnail} className="card-img-top w-auto" alt="Course" />
      <div className="card-body">
        <h5 className="card-title">{courseData.courseName}</h5>
        <p className="card-text">
          Ngày tạo: {new Date(courseData.createdAt).toLocaleString()}
        </p>
        <p className="card-text">
          Trạng thái:{" "}
          <span
            className={
              courseData.isPublic
                ? "badge text-bg-success"
                : "badge text-bg-warning"
            }
          >
            {courseData.isPublic ? "Công khai" : "Riêng tư"}
          </span>
        </p>
        <a href="/" className="btn btn-primary">
          Tham gia khóa học
        </a>
      </div>
    </div>
  );
}

export default CourseCard;
