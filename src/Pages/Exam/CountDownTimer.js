import React, { useState, useEffect } from "react";

const CountdownTimer = ({ exam_time, submit }) => {
  // Convert exam_time từ phút sang giây
  const [timeLeft, setTimeLeft] = useState(exam_time * 60);

  useEffect(() => {
    // Chạy timer mỗi giây
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Dừng timer khi hết thời gian
          submit(); // Gọi hàm submit
          return 0;
        }
        return prev - 1; // Giảm thời gian
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup khi component unmount
  }, [submit]);

  // Format thời gian thành phút và giây
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
