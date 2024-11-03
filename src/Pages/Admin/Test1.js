import React from "react";

function Test1() {
  return (
    <div>
      <h1 className="text-center text-primary mb-4">Dashboard</h1>
      <hr />

      <div className="row mb-5">
        <div className="col-md-6">
          <div className="card border-0 shadow rounded-lg h-100">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center">
                Google <span className="badge bg-danger">Ưu Tiên Cao</span>
              </h5>
              <p className="text-muted">Google Inc.</p>
              <div className="progress mb-3">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                ></div>
              </div>
              <small className="text-muted">Công Việc Hoàn Thành: 25/50</small>
              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-sm btn-outline-primary">
                  Ứng Dụng iOS
                </button>
                <button className="btn btn-sm btn-outline-secondary">
                  UI/UX
                </button>
              </div>
              <p className="mt-4 text-secondary">
                <strong>Hạn Chót:</strong> 20 Tháng Sáu
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow rounded-lg h-100">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center">
                Slack{" "}
                <span className="badge bg-warning text-dark">
                  Ưu Tiên Trung Bình
                </span>
              </h5>
              <p className="text-muted">Slack Corporation</p>
              <div className="progress mb-3">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                ></div>
              </div>
              <small className="text-muted">Công Việc Hoàn Thành: 30/30</small>
              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-sm btn-outline-primary">
                  Ứng Dụng iOS
                </button>
                <button className="btn btn-sm btn-outline-secondary">
                  Android
                </button>
              </div>
              <p className="mt-4 text-secondary">
                <strong>Hạn Chót:</strong> 20 Tháng Sáu
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row align-items-stretch">
        <div className="col-md-6 mb-4">
          <div className="p-3 bg-white rounded shadow h-100">
            <h5 className="text-primary mb-3">Công Việc Của Tôi (05)</h5>
            <ul className="list-group shadow-sm rounded-lg">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Tạo Khung Sườn
                <span className="badge bg-success rounded-pill">✔</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Thiết Kế Logo Slack
                <span className="badge bg-secondary rounded-pill">3</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Thiết Kế Bảng Điều Khiển
                <span className="badge bg-secondary rounded-pill">5</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="p-3 bg-white rounded shadow h-100">
            <h5 className="text-primary mb-3">Tin Nhắn</h5>
            <ul className="list-group shadow-sm rounded-lg">
              <li className="list-group-item">
                <strong>Tuấn Kiệt</strong>: Xin chào Gia Bảo! Bạn khỏe không?
              </li>
              <li className="list-group-item">
                <strong>Gia Bảo</strong>: Bạn có cần thiết kế đó không?
              </li>
              <li className="list-group-item">
                <strong>Tuấn Kiệt</strong>: Giá theo giờ là bao nhiêu...
              </li>
              <li className="list-group-item">
                <strong>Gia Bảo</strong>: Tuyệt vời!!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test1;
