import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Courses{
    course_id: string,
    course_name: string,
    description: string,
    is_public: boolean,
    thumbnail: string,
    teacherFullName: string
}

function SearchPage() {
  const { searchValue } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Courses[] | null>([
    {
      "course_id": "452c4491-9fe1-11ef-8f8b-ce039959f5d6",
      "course_name": "Lịch Sử Việt Nam",
      "thumbnail": "https://res.cloudinary.com/brandocloud/image/upload/v1731773101/ELearning/Courses/nhung-cuon-sach-ve-lich-su-viet-nam-anh-dai-dien_diw5is.jpg",
      "description": "Lịch sử Việt Nam từ thời kỳ dựng nước đến hiện đại",
      "is_public": true,
      "teacherFullName": "Nguyen Minh"
    },
    {
      "course_id": "e69be797-af21-447b-bac6-4224bdb145e5",
      "course_name": "Lịch Sử Thế Giới",
      "thumbnail": "https://res.cloudinary.com/brandocloud/image/upload/v1731773137/ELearning/Courses/20230914_DJAouDtAWd_tmepbw.jpg",
      "description": "Khóa học về lịch sử thế giới",
      "is_public": true,
      "teacherFullName": "Trần Vũ Quang Trường"
    }
  ]);
  return (
    <div className="list-courses--content">
      {courses && courses.length > 0 ? (
        courses.map((item, index) => (
          <div
            className="courses-card"
            key={index}
            // Nếu được gọi trong MyCourse thì sẽ chuyển đến trang quản lý khi nhấn
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
  );
}

export default SearchPage;
