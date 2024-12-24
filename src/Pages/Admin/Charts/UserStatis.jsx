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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserStatis = () => {
  const [datas, setDatas] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Năm mặc định là năm hiện tại
  const [years, setYears] = useState([]);

  useEffect(() => {
    // Lấy danh sách năm (ví dụ từ 2010 đến năm hiện tại)
    const currentYear = new Date().getFullYear();
    const generatedYears = Array.from({ length: currentYear - 2010 + 1 }, (_, i) => 2010 + i);
    setYears(generatedYears);
  }, []);

  useEffect(() => {
    const handleGetData = async () => {
      const result = await fetchUserRegisterByMonth(selectedYear); // Gọi API theo năm
      if (result !== null) {
        setDatas(result);
      }
    };
    handleGetData();
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const data = {
    labels: datas.map((item) => item.label),
    datasets: [
      {
        label: "Số lượng tham gia",
        data: datas.map((item) => item.data),
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
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `Thống Kê Người Dùng Tham Gia Website Theo Tháng - Năm ${selectedYear}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {/* Dropdown chọn năm */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="year-select">Chọn năm: </label>
        <select className="form-select p-2 m-2" id="year-select" value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Biểu đồ */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserStatis;
