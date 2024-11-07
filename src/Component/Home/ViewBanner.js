import React, { useEffect, useState } from "react";
import "../../CssFolder/Home.css";
import Cookies from "js-cookie";
function ViewBanner() {
  const loginCookies = Cookies.get("loginData");
  const [convertData, setConvertData] = useState(null)
  useEffect(() =>{
    if(loginCookies !== undefined)
    {
        setConvertData(JSON.parse(loginCookies));
    }
  }, [loginCookies])
  return (
    <div>
      {convertData !== null && (
        <div className="my-2">
          <div className="d-flex align-content-center gap-3 px-3 p-lg-3">
            <img
              style={{
                width: "4.8rem",
                height: "4.8rem",
                borderRadius: "100rem",
              }}
              alt="avatar"
              src={convertData.avatar}
            />
            <h4 className="align-content-center ">
              {`Chào mừng ${convertData.lastName} quay trở lại!`}
            </h4>
          </div>
        </div>
      )}
      <div id="carouselBanner" className="carousel slide my-5">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={`https://img-c.udemycdn.com/notices/web_carousel_slide/image/19bf0915-9a47-4cbd-8237-d82770f2e384.png`}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="banner--content-box">
            <h1>Luôn đi trước và dẫn đầu </h1>
            <p>Phát triển vượt trội bằng cách học kỹ năng mới nhất.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBanner;
