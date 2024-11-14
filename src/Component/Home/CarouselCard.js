import { useInView, motion } from "framer-motion";
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
  // Sử dụng useRef để tham chiếu đến phần tử
  const ref = React.useRef(null);

  // Kiểm tra xem phần tử có đang trong chế độ xem không
  const isInView = useInView(ref, { once: false }); // once: false để thay đổi theo từng lần vào/ra chế độ xem

  // Các thuộc tính của animation
  const variants = {
    hidden: { opacity: 0, y: 60 }, // Ẩn với độ mờ và di chuyển xuống dưới
    visible: { opacity: 1, y: 0 }, // Hiện lên với độ mờ 1 và trở về vị trí bình thường
  };

  return (
    <motion.div
    ref={ref}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"} // Chuyển đổi giữa ẩn và hiện dựa vào isInView
    variants={variants}
    transition={{ duration: 0.5, ease: "easeOut" }} // Thời gian và kiểu chuyển động
    >
      <Carousel responsive={responsive} infinite={true} autoPlay={false}>
        {courseData.map((item, index) => (
          <div
            className="carousel-card"
            key={index}
            onClick={() => navigate(`/course/${item.courseID}`)}
            style={{ padding: "10px" }}
          >
            <img loading="lazy" src={item.thumbnail} alt="Course" />
            <div className="card-body" style={{ padding: "10px" }}>
              <h4 className="card-title">{item.courseName}</h4>
              <p className="card-description">{item.description}</p>
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
      </Carousel>
    </motion.div>
  );
};

export default CourseCarousel;
