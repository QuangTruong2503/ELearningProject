import React, { useState, useEffect } from "react";

const CountdownTimer = ({ started_at, exam_time, submit }) => {
  // Xác định thời điểm kết thúc
  const startedAt = new Date(started_at).getTime();
  console.log(new Date(started_at).toISOString())
  const examTime = exam_time * 60 * 1000;
  const finishTime = startedAt + examTime;

  // Tính toán thời gian còn lại
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    return Math.max(Math.floor((finishTime - now) / 1000), 0);
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      return Math.max(Math.floor((finishTime - now) / 1000), 0);
    };
    // Cập nhật thời gian còn lại mỗi giây
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      if (calculateTimeLeft() <= 0) {
        clearInterval(timer); // Dừng khi hết giờ
        // submit(); // Gọi hàm submit
      }
    }, 1000);

    return () => clearInterval(timer); // Dọn dẹp khi component bị hủy
  }, [finishTime, submit]);

  // Format thời gian thành phút:giây
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div>
      <h5>Thời gian còn lại: {formatTime(timeLeft)}</h5>
    </div>
  );
};

export default CountdownTimer;
