import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  faGear,
  faRotateLeft,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import PaginationsComponent from "../PaginationsComponent";
import TablePlaceHolder from "../PlaceHolder/TablePlaceHolder.js";
import { fetchCourses } from "../../API/coursesAPI.js";
import CourseDetail from "../../Pages/Admin/Courses/CourseDetail.js";
import DeleteModal from "../Modal/DeleteModal.js";
import { fetchDeleteData } from "../../API/fetchAPI.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UsersTable({ reloadData, data = [] }) {
  const [datas, setDatas] = useState([]);
  const [selectedID, setselectedID] = useState(null);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValues, setSearchValues] = useState("");
  
  const navigate = useNavigate();

  const handleReloadData = async () => {
    setIsLoading(true)
    const results = await fetchCourses(`Courses?page=${datas.currentPage}&searchName=${searchValues}`);
    if(results !== null)
    {
      setDatas(results);
      setIsLoading(false)
    }
  };
  //Khi người dùng chuyển trang
  const handleClickPage = async (numPage) => {
    setIsLoading(true);
    const results = await fetchCourses(
      `Courses?page=${numPage}&searchName=${searchValues}`
    );
    if (results !== undefined) {
      setDatas(results);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setIsLoading(false);
    }
  };
  //Tìm kiếm dữ liệu theo tên khóa học
  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await fetchCourses(`Courses?searchName=${searchValues}`);
    if (result !== undefined) {
      setDatas(result);
    }
  };
  const handleEdit = (ID) => {
    setselectedID(ID);
  };
  const handleDelete = async () => {
    if (selectedDelete !== null) {
      const result = await fetchDeleteData(`Courses/${selectedDelete}`);
      if (result !== null) {
        if (result.success) {
          toast.success(result.message);
          handleReloadData();
          setSelectedDelete(null)
          return;
        }
        toast.warning(result.message);
      }
    }
  };
  useEffect(() => {
    if (data.length !== 0) {
      setDatas(data);
      setIsLoading(false);
    }
  }, [data]);
  return (
    <div>
      <h2 className="text-center mb-5">DANH SÁCH CÁC KHÓA HỌC</h2>
      <div className="d-flex justify-content-between">
        <form className="col-md-4 d-flex gap-2" onSubmit={handleSearch}>
          <input
            type="search"
            className="form-control"
            id="search"
            placeholder="Tìm tên hoặc email"
            onChange={(e) => setSearchValues(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center gap-1"
          >
            Tìm <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <div>
          <button
            className="btn text-primary"
            onClick={() => {
              setIsLoading(true);
              reloadData();
            }}
          >
            <FontAwesomeIcon className="text-xl" icon={faRotateLeft} /> Tải lại{" "}
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-3">
          <thead className="thead-dark">
            <tr>
              <th>Khóa học</th>
              <th>Người tạo</th>
              <th>Môn học</th>
              <th>Mã mời</th>
              <th>Trạng thái</th>
              <th>Tùy chỉnh</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <TablePlaceHolder numbCols={6} numbRows={10} />}
            {datas.length !== 0 &&
              !isLoading &&
              datas.data.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseName}</td>
                  <td>{course.teacherFullName}</td>
                  <td>{course.subjectName}</td>
                  <td>{course.inviteCode}</td>
                  <td>{course.isPublic ? "Công khai" : "Riêng tư"}</td>
                  <td>
                    <div className="dropdown d-flex align-content-center justify-content-center">
                      <button
                        className="p-2 btn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon icon={faGear} />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item text-success"
                            type="button"
                            onClick={() => handleEdit(course.courseID)}
                          >
                            Chỉnh sửa
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-primary"
                            type="button"
                            onClick={() => navigate(`/manage-course/${course.courseID}/details`)}
                          >
                            Xem chi tiết
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="btn text-danger dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => setSelectedDelete(course.courseID)}
                          >
                            Xóa
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Paginations */}
      {datas.length !== 0 && (
        <PaginationsComponent
          currentPage={datas.currentPage}
          totalPage={datas.totalPages}
          changePage={handleClickPage}
        />
      )}
      {/* Modal Chỉnh sửa dữ liệu */}
      {selectedID !== null && (
        <CourseDetail
          ID={selectedID}
          onClose={() => setselectedID(null)}
          onSave={handleReloadData}
        />
      )}

      {/* Modal xóa dữ liệu */}
      <DeleteModal
        title={"Xóa dữ liệu khóa học"}
        content={
          "Bạn có chắc chắn muốn xóa khóa học này? Sau khi xóa các thông tin liên quan như: Bài thi, bài học sẽ bị xóa."
        }
        onClose={() => setSelectedDelete(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default UsersTable;
