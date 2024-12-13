import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchUserRegisterByMonth } from "../../../API/chartsAPI";

// Đăng ký các thành phần cần thiết từ Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const UserStatis = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() =>{
    const handleGetData = async () =>{
      const result = await fetchUserRegisterByMonth();
      if(result !== null)
      {
        setDatas(result)
      }
    }
    handleGetData();
  },[])
  // Dữ liệu và cấu hình biểu đồ
  const data = {
    labels: datas.map(item =>(item.label)) ,
    datasets: [
      {
        label: "Số lượng tham gia",
        data: datas.map(item =>(item.data)), // Dữ liệu
        backgroundColor: [
          "#1E90FF",
          "#FFB6C1",
          "#32CD32",
          "#FFD700",
          "#228B22",
          "#FFA07A",
          "#FF4500",
          "#FF8C00",
          "#D2B48C",
          "#FF6347",
          "#FFDAB9",
          "#8B0000",
        ],
        borderWidth: 1, // Độ dày của đường viền
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Hiển thị legend
        position: "top", // Vị trí của legend
      },
      title: {
        display: true,
        text: "Thống Kê Người Dùng Tham Gia Website Theo Tháng", // Tiêu đề biểu đồ
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Trục y bắt đầu từ 0
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default UserStatis;
