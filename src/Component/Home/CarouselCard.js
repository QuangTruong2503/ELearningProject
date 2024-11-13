import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const CourseCarousel = ({ courseData }) => {
  const navigate = useNavigate();

  // Cấu hình cho carousel
  const responsive = {
    superLargeDesktop: {
      // cho màn hình lớn
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <Carousel responsive={responsive} infinite={true} autoPlay={false}>
      {courseData.map((item, index) => (
        <div
          className="carousel-card"
          key={index}
          onClick={() => navigate(`/course/${item.courseID}`)}
          style={{ padding: "10px" }}
        >
          <img src={item.thumbnail} alt="Course" />
          <div className="card-body" style={{ padding: "10px" }}>
            <h4 className="card-title">{item.courseName}</h4>
            <p className="card-description">{item.description}</p>
            <p className="card-text">Đăng bởi: {item.teacherFullName}</p>
            <p className="card-text">
              Trạng thái:{" "}
              <span
                className={`badge ${item.isPublic ? "bg-success" : "bg-warning"}`}
              >
                {item.isPublic ? "Công khai" : "Riêng tư"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CourseCarousel;
