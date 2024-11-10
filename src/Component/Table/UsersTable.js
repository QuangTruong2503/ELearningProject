import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  faGear,
  faRotateLeft,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import UserDetail from "../../Pages/Admin/Users/UserDetail";
import PaginationsComponent from "../PaginationsComponent";
import { fetchAllUsers } from "../../API/user";
import TablePlaceHolder from "../PlaceHolder/TablePlaceHolder.js";

function UsersTable({ reloadData, data = [] }) {
  const [userDatas, setUserDatas] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValues, setSearchValues] = useState("");
  const handleEdit = (userID) => {
    setSelectedUser(userID);
  };
  const handleReloadData = () => {
    reloadData();
  };
  const handleClickPage = async (numPage) => {
    const results = await fetchAllUsers(
      `Users?page=${numPage}&search=${searchValues}`
    );
    if (results !== undefined) {
      setUserDatas(results);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  //Tìm kiếm dữ liệu theo tên
  const handleSearchUsers = async (e) => {
    e.preventDefault();
    const result = await fetchAllUsers(`Users?search=${searchValues}`);
    if (result !== undefined) {
      setUserDatas(result);
    }
  };
  useEffect(() => {
    if (data.length !== 0) {
      setUserDatas(data);
      setIsLoading(false);
    }
  }, [data]);
  return (
    <>
      <h2 className="text-center mb-5">DANH SÁCH THÀNH VIÊN</h2>
      <div className="d-flex justify-content-between">
        <form className="col-md-4 d-flex gap-2" onSubmit={handleSearchUsers}>
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
      <table className="table table-bordered table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Tài khoản</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Ngày tạo</th>
            <th>Vai trò</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <TablePlaceHolder numbCols={6} numbRows={10} />}
          {userDatas.length !== 0 &&
            !isLoading &&
            userDatas.data.map((user, index) => (
              <tr key={index}>
                <td>{user.user_name}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>{user.role_id}</td>
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
                          onClick={() => handleEdit(user.user_id)}
                        >
                          Chỉnh sửa
                        </button>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Paginations */}
      {userDatas.length !== 0 && (
        <PaginationsComponent
          currentPage={userDatas.current}
          totalPage={userDatas.pages}
          changePage={handleClickPage}
        />
      )}
      {/* Modal Chỉnh sửa dữ liệu */}
      {selectedUser && (
        <UserDetail
          userID={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleReloadData}
        />
      )}
    </>
  );
}

export default UsersTable;
