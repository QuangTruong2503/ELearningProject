import React, { useState } from "react";

function CourseCard({ course }) {
  const [courseData, setCourseData] = useState({
    courseID: "1b8169e8-8f72-4baf-b015-94d70873642d",
    courseName: "Hóa Học Đại Cương",
    description: "Khóa học cơ bản về hóa học",
    inviteCode: "GHI769",
    isPublic: true,
    createdAt: "2024-11-06T13:35:28",
    thumbnail:
      "https://res.cloudinary.com/brandocloud/image/upload/v1730959170/ELearning/Courses/courses-default.png",
    teacherID: "e4ce441e-d292-46db-b1d5-c3e581b41c8e",
    teacherFullName: "Nguyen Minh",
    subjectID: 3,
    subjectName: "Hóa học",
  });
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
