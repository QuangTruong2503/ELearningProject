import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCoursesPublicBySubject,
} from "../API/coursesAPI";

interface Courses {
    courseID: string;
    courseName: string;
    description: string;
    isPublic: boolean;
    thumbnail: string;
    teacherFullName: string;
}

function SearchPage() {
  const { subjectID } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Courses[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Courses[]>(courses);
  const [filterOption, setFilterOption] = useState<string>("all");

  useEffect(() => {
    const handleFetchBySearch = async () => {
      const results = await fetchCoursesPublicBySubject(subjectID);
      if (results !== null) {
        setCourses(results);
      }
    };
    //Lọc dữ liệu
    let filtered = [...courses];
    if (filterOption === "public") {
      filtered = courses.filter((course) => course.isPublic);
    } else if (filterOption === "private") {
      filtered = courses.filter((course) => !course.isPublic);
    } else if (filterOption === "name-az") {
      filtered = [...courses].sort((a, b) =>
        a.courseName.localeCompare(b.courseName)
      );
    }
    handleFetchBySearch();
    setFilteredCourses(filtered);
  }, [filterOption, courses, subjectID]);
  useEffect(() =>{
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="container my-5 mx-auto">
      <div className="shadow min-vh-100 p-4 rounded-2">
        <div className="d-flex justify-content-end align-items-center mb-4">
          <select
            id="filter"
            className="form-select w-auto"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="public">Công khai</option>
            <option value="private">Riêng tư</option>
            <option value="name-az">Tên A - Z</option>
          </select>
        </div>
        <div className="list-courses--content">
          {filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((item, index) => (
              <div
                className="courses-card"
                key={index}
                onClick={() => {
                  navigate(`/course/${item.courseID}`);
                }}
              >
                <img src={item.thumbnail} alt="Course thumbnail" />
                <div
                  className="d-flex flex-column align-items-start justify-content-start gap-1"
                  style={{ padding: "10px" }}
                >
                  <h5 className="card-title">{item.courseName}</h5>
                  <p className="card-text">Đăng bởi: {item.teacherFullName}</p>
                  <p className="card-text">
                    Trạng thái:{" "}
                    <span
                      className={`badge ${
                        item.isPublic ? "bg-success" : "bg-warning"
                      }`}
                    >
                      {item.isPublic ? "Công khai" : "Riêng tư"}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Không có khóa học nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
