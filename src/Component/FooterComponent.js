import React from "react";
import "../CssFolder/Footer.css";
function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h3>Về QuangTruongStore</h3>
          <ul>
            <li>
              <a href="...">Giới thiệu</a>
            </li>
            <li>
              <a href="...">Tuyển dụng</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Chính sách</h3>
          <ul>
            <li>
              <a href="...">Chính sách bảo hành</a>
            </li>
            <li>
              <a href="...">Chính sách thanh toán</a>
            </li>
            <li>
              <a href="...">Chính sách giao hàng</a>
            </li>
            <li>
              <a href="...">Chính sách bảo mật</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Thông tin</h3>
          <ul>
            <li>
              <a href="...">Hệ thống cửa hàng</a>
            </li>
            <li>
              <a href="...">Hướng dẫn mua hàng</a>
            </li>
            <li>
              <a href="...">Tra cứu địa chỉ bảo hành</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Tổng đài hỗ trợ (8:00 - 21:00)</h3>
          <ul>
            <li>
              Mua hàng:{" "}
              <a className="footer-contact" href="tel:19005301">
                1900.5301
              </a>
            </li>
            <li>
              Bảo hành:{" "}
              <a className="footer-contact" href="tel:19005325">
                1900.5325
              </a>
            </li>
            <li>
              Khiếu nại:{" "}
              <a className="footer-contact" href="tel:18006173">
                1800.6173
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                className="footer-contact"
                href="mailto:trutruong2503@gmail.com"
              >
                trutruong2503@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Kết nối với chúng tôi</p>
        <div className="social-icons">
          <a href="/">
            <img
              loading="lazy"
              src="https://file.hstatic.net/200000636033/file/facebook_1_0e31d70174824ea184c759534430deec.png"
              alt="Facebook"
            />
          </a>
          <a href="/">
            <img
              loading="lazy"
              src="https://file.hstatic.net/200000722513/file/tiktok-logo_fe1e020f470a4d679064cec31bc676e4.png"
              alt="TikTok"
            />
          </a>
          <a href="/">
            <img
              loading="lazy"
              src="https://file.hstatic.net/200000636033/file/youtube_1_d8de1f41ca614424aca55aa0c2791684.png"
              alt="YouTube"
            />
          </a>
          <a href="/">
            <img
              loading="lazy"
              src="https://file.hstatic.net/200000722513/file/icon_zalo__1__f5d6f273786c4db4a3157f494019ab1e.png"
              alt="Zalo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
