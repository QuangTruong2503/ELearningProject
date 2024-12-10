import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCoursesBySearch } from "../API/coursesAPI";

interface Courses {
  course_id: string;
  course_name: string;
  description: string;
  is_public: boolean;
  thumbnail: string;
  teacherFullName: string;
}

function SearchPage() {
  const { searchValue } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Courses[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Courses[]>(courses);
  const [filterOption, setFilterOption] = useState<string>("all");

  useEffect(() => {
    const handleFetchBySearch = async () =>{
      const results = await fetchCoursesBySearch(searchValue)
      if(results !== null)
      {
        setCourses(results)
      }
    }
    //Lọc dữ liệu
    let filtered = [...courses];
    if (filterOption === "public") {
      filtered = courses.filter((course) => course.is_public);
    } else if (filterOption === "private") {
      filtered = courses.filter((course) => !course.is_public);
    } else if (filterOption === "name-az") {
      filtered = [...courses].sort((a, b) =>
        a.course_name.localeCompare(b.course_name)
      );
    }
    handleFetchBySearch();
    setFilteredCourses(filtered);
  }, [filterOption, courses, searchValue]);


  return (
    <div className="container my-5 mx-auto">
      <h5 className="mb-4">Tìm kiếm theo: {`"${searchValue}"`}</h5>
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
                  navigate(`/course/${item.course_id}`);
                }}
              >
                <img src={item.thumbnail} alt="Course thumbnail" />
                <div
                  className="d-flex flex-column align-items-start justify-content-start gap-1"
                  style={{ padding: "10px" }}
                >
                  <h5 className="card-title">{item.course_name}</h5>
                  <p className="card-text">Đăng bởi: {item.teacherFullName}</p>
                  <p className="card-text">
                    Trạng thái:{" "}
                    <span
                      className={`badge ${
                        item.is_public ? "bg-success" : "bg-warning"
                      }`}
                    >
                      {item.is_public ? "Công khai" : "Riêng tư"}
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
