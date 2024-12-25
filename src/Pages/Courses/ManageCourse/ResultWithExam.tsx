import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { fetchGetStudentsStatus } from "../../../API/examsAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import SpinnerLoader from "../../../Component/Loader/SpinnerLoader.js";
import * as XLSX from "xlsx";
import saveAs from "file-saver";

interface Student {
  studentId: string;
  fullName: string;
  email: string;
  hasSubmitted: boolean;
  submissionScore: number | null;
  timeSuccess: number | null;
  submissionID: string | null;
}

interface Data {
  student: Student[];
  examName: string;
}

const StudentTable = () => {
  const { examID } = useParams();
  const [students, setStudents] = useState<Data | undefined>();

  const [filter, setFilter] = useState<"all" | "completed" | "notCompleted">(
    "all"
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as "all" | "completed" | "notCompleted");
  };

  const filteredStudents = students?.student.filter((student) => {
    if (filter === "completed") return student.hasSubmitted;
    if (filter === "notCompleted") return !student.hasSubmitted;
    return true; // 'all'
  });

  useEffect(() => {
    const handleFetchData = async () => {
      const result = await fetchGetStudentsStatus(examID);
      if (result !== null) {
        setStudents(result);
      }
    };
    handleFetchData();
  }, [examID]);

  const exportToExcel = () => {
    if (!students) return;

    // Chuẩn bị dữ liệu cho Excel
    const excelData = students.student.map((student, index) => ({
      STT: index + 1,
      "Họ Tên": student.fullName,
      Email: student.email,
      Điểm: student.submissionScore !== null ? student.submissionScore : "N/A",
      "Thời Gian Làm Bài": student.timeSuccess
        ? student.timeSuccess
        : "N/A",
      "Trạng Thái": student.hasSubmitted ? "Hoàn thành" : "Trống",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sinh viên");

    // Xuất file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `${students.examName || "DanhSach"}_sinhvien.xlsx`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-start">
        <button
          className="btn text-primary d-flex align-items-center gap-1"
          onClick={() => window.history.back()}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
        </button>
      </div>
      {/* Content */}
      {students === undefined ? (
        <div className="d-flex justify-content-center h-100">
          <SpinnerLoader></SpinnerLoader>
        </div>
      ) : (
        <div>
          <h2 className="text-center mb-4">{students?.examName}</h2>

          <div className="d-flex justify-content-between">
            {/* Filter Dropdown */}
          <div className="mb-3 text-center d-flex justify-content-start align-items-center">
            <label htmlFor="filterSelect" className="me-2">
              Lọc:
            </label>
            <select
              id="filterSelect"
              className="form-select d-inline w-auto"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">Tất cả</option>
              <option value="completed">Hoàn thành</option>
              <option value="notCompleted">Chưa hoàn thành</option>
            </select>
          </div>

          {/* Export Button */}
          <div className="text-end mb-3">
            <button
              className="btn btn-success"
              onClick={exportToExcel}
            >
              <FontAwesomeIcon icon={faFileExcel}/>
              <span className="mx-1">Xuất Excel</span>
            </button>
          </div>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Điểm</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th>Tùy chọn</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents !== undefined &&
                filteredStudents.map((student, index) => (
                  <tr key={student.studentId}>
                    <td>{index + 1}</td>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                    <td>
                      {student.submissionScore !== null
                        ? student.submissionScore
                        : "N/A"}
                    </td>
                    <td className="w-auto">
                      {student.timeSuccess
                        ? student.timeSuccess
                        : "N/A"}
                    </td>
                    <td
                      style={{
                        color: student.hasSubmitted ? "green" : "red",
                      }}
                    >
                      {student.hasSubmitted ? "Hoàn thành" : "Trống"}
                    </td>
                    <td className="w-auto">
                      {student.hasSubmitted ? (
                        <NavLink
                          to={`/exam/${examID}/result/${student.submissionID}`}
                          className="btn btn-outline-primary fs-6"
                        >
                          Xem
                        </NavLink>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
