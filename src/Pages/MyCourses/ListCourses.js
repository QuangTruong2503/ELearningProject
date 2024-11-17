import React, { useEffect, useState } from "react";
import { fetchCoursesByTeacher } from "../../API/coursesAPI";
import PaginationsComponent from "../../Component/PaginationsComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import SpinnerLoader from "../../Component/Loader/SpinnerLoader";
import { motion } from "framer-motion";
function ListCourses({
  title,
  data,
  userData,
  create = false,
  loading = true,
  myCourse = false,
}) {
  const [courses, setCourses] = useState([]);
  const [searchValues, setSearchValues] = useState("");
  const userID = userData ? userData.userID : "";
  const navigate = useNavigate();
  const handleGetMyCourses = async (e) => {
    e.preventDefault();
    const result = await fetchCoursesByTeacher(
      `Courses/teacher?id=${userID}&page=${data.currentPage}&search=${searchValues}`
    );
    if (result !== null) {
      setCourses(result);
    }
  };
  //Khi người dùng chuyển trang
  const handleClickPage = async (numPage) => {
    const results = await fetchCoursesByTeacher(
      `Courses/teacher?id=${userID}&page=${numPage}&search=${searchValues}`
    );
    if (results !== null) {
      setCourses(results);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (data && data.data) {
      // Ensure data and data.data are defined
      setCourses(data);
    }
  }, [data]);

  // Hiệu ứng animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1, // Hiệu ứng xuất hiện lần lượt
      },
    },
  };
  return (
    <div>
      <div className="my-4">
        <h3>{title}</h3>
      </div>
      <div className="course-overview">
        <h4>Course overview</h4>
        <div className="d-flex align-items-center justify-content-between mb-4 d-flex gap-2">
          <div className="d-flex gap-2">
            <form onSubmit={handleGetMyCourses}>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={(e) => setSearchValues(e.target.value)}
              />
            </form>
            <div className="d-flex gap-2">
              <select className="form-select">
                <option>Sort by course name</option>
                <option>Sort by date</option>
              </select>
            </div>
          </div>
          {/* Vai trò giáo viên hoặc admin có thể tạo khóa học*/}
          {userData && userData.roleID !== "student" && create && (
            <div className="align-items-end">
              <NavLink
                to={"/course/create"}
                className="btn btn-outline-success"
              >
                Tạo khóa học <FontAwesomeIcon icon={faPlus} />
              </NavLink>
            </div>
          )}
        </div>
        {/* Danh sách các khóa học */}
        {loading && <SpinnerLoader />}
        {!loading && (
          <motion.div
            className="list-courses--content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {courses.data && courses.data.length > 0 ? (
              courses.data.map((item, index) => (
                <motion.div
                  className="courses-card"
                  key={index}
                  variants={containerVariants}
                  whileTap={{ scale: 0.95 }} // Thu nhỏ nhẹ khi click
                  // Nếu được gọi trong MyCourse thì sẽ chuyển đến trang quản lý khi nhấn
                  onClick={() => {
                    myCourse
                      ? navigate(`/manage-course/${item.course_id}/details`)
                      : navigate(`/course/${item.course_id}`);
                  }}
                >
                  <img src={item.thumbnail} alt="Course thumbnail" />
                  <div className="d-flex flex-column align-items-start justify-content-start gap-1" style={{ padding: "10px" }}>
                    <h5 className="card-title">{item.course_name}</h5>
                    <p className="card-text">
                      Đăng bởi: {item.teacherFullName}
                    </p>
                    <p className="card-text">
                      Trạng thái:{" "}
                      <span
                        className={`badge ${
                          item.is_public ? "bg-success" : "bg-warning"
                        }`}
                      >
                        {item.is_public ? "Công khai" : "Riêng tư"}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                Không có khóa học nào.
              </motion.p>
            )}
          </motion.div>
        )}
        {/* Paginations */}
        {!loading && (
          <div className="d-flex justify-content-center">
            <PaginationsComponent
              currentPage={courses.currentPage}
              totalPage={courses.totalPages}
              changePage={handleClickPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListCourses;
