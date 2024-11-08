import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
function CarouselCard({ courseData }) {

  let currentSlide = 0;
  function updateNavigationButtons() {
    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");
  
    // Ẩn hoặc hiển thị nút "Previous"
    if (currentSlide === 0) {
      btnPrev.style.visibility = "hidden";
    } else {
      btnPrev.style.visibility = "visible";
    }
  
    // Ẩn hoặc hiển thị nút "Next"
    const totalCards = document.querySelectorAll(".carousel-card").length;
    const containerWidth = document.querySelector(".carousel-container").offsetWidth;
    const cardWidth = document.querySelector(".carousel-card").offsetWidth + 20; // Card width + margin
    const visibleCards = Math.floor(containerWidth / cardWidth);
    const maxSlide = totalCards - visibleCards;
  
    if (currentSlide === maxSlide) {
      btnNext.style.visibility = "hidden";
    } else {
      btnNext.style.visibility = "visible";
    }
  }
  function moveCarousel(direction) {
    const carousel = document.getElementById("carousel");
    const cardWidth = document.querySelector(".carousel-card").offsetWidth + 20; // Card width + margin
    const totalCards = document.querySelectorAll(".carousel-card").length;
    const containerWidth = document.querySelector(
      ".carousel-container"
    ).offsetWidth;
    const visibleCards = Math.floor(containerWidth / cardWidth);
    const maxSlide = totalCards - visibleCards;

    currentSlide += direction;

    if (currentSlide < 0) {
      currentSlide = maxSlide;
    } else if (currentSlide > maxSlide) {
      currentSlide = 0;
    }

    const offset = -currentSlide * cardWidth;
    carousel.style.transform = `translateX(${offset}px)`;
    // Cập nhật trạng thái của các nút điều hướng
    updateNavigationButtons();
  }

  window.addEventListener("resize", () => {
    moveCarousel(0); // Recalculate position on resize
  });
  useEffect(() =>{
    // Gọi updateNavigationButtons khi trang tải lần đầu
    updateNavigationButtons();
  },[])
  return (
    <div className="carousel-container">
      <div className="carousel" id="carousel">
        {courseData.map((item, index) => (
          <div className="carousel-card" key={index}>
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
      <button class="carousel-btn prev" id="btnPrev" onClick={() => moveCarousel(-1)}>
        <FontAwesomeIcon icon={faAngleLeft}/>
      </button>
      <button class="carousel-btn next" id="btnNext" onClick={() => moveCarousel(1)}>
      <FontAwesomeIcon icon={faAngleRight}/>
      </button>
    </div>
  );
}

export default CarouselCard;
