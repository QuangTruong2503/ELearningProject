import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchUsersByCourse } from "../../../API/enrollmentsAPI";
import PaginationsComponent from "../../../Component/PaginationsComponent";

function JoinedUsers() {
  const { courseID } = useParams();
  const [data, setData] = useState([]);

  //Khi người dùng chuyển trang
  const handleClickPage = async (numPage) => {
    const results = await fetchUsersByCourse(
      `get/users-by-course?courseID=${courseID}&page=${numPage}`
    );
    if (results !== null) {
      setData(results);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  //Lấy dữ liệu người dùng đã tham gia khóa học theo courseID
  useEffect(() => {
    const handleGetUsersJoinedCourse = async () => {
      const result = await fetchUsersByCourse(
        `get/users-by-course?courseID=${courseID}`
      );
      if (result !== null) {
        setData(result);
        console.log(result);
      }
    };
    handleGetUsersJoinedCourse();
  }, [courseID]);
  return (
    <div class="container py-4">
      {data.data !== undefined && (
        <h5 className="mb-3">Thành viên: {data.data.length}</h5>
      )}

      <div class="list-group" style={{ minHeight: "100px" }}>
        {data.data !== undefined &&
          data.data.map((item, index) => (
            <div class="list-group-item d-flex align-items-center" key={index}>
              <img
                src={item.avatar_url}
                alt="Avatar"
                class="rounded-circle me-3"
                style={{ width: "50px", height: '50px'}}
              />
              <div>
                <NavLink to={`/user/${item.user_id}`} class="mb-0 text-black">
                  {item.first_name} {item.last_name}
                </NavLink>
              </div>
            </div>
          ))}
      </div>
      {data.totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <PaginationsComponent
            currentPage={data.currentPage}
            totalPage={data.totalPages}
            changePage={handleClickPage}
          />
        </div>
      )}
    </div>
  );
}

export default JoinedUsers;
