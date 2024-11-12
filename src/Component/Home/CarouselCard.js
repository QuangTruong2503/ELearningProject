import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
function CarouselCard({ courseData }) {
  const navigate = useNavigate();
  return (
    <div className="carousel-container">
      <div className="carousel" id="carousel">
        {courseData.map((item, index) => (
          <div className="carousel-card" key={index} onClick={() => navigate(`/course/${item.courseID}`)}>
            <img src={item.thumbnail} alt="Course" />
            <div className="card-body">
              <h4 className="card-title">{item.courseName}</h4>
              <p className="card-description">
                {item.description}
              </p>
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
        ))}
      </div>
      <button className="carousel-btn prev" id="btnPrev" >
        <FontAwesomeIcon icon={faAngleLeft}/>
      </button>
      <button className="carousel-btn next" id="btnNext">
      <FontAwesomeIcon icon={faAngleRight}/>
      </button>
    </div>
  );
}

export default CarouselCard;
