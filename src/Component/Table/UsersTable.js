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
import { toast } from "react-toastify";
import DeleteModal from "../Modal/DeleteModal.js";
import { fetchDeleteData } from "../../API/fetchAPI.js";

function UsersTable({ reloadData, data = [] }) {
  const [userDatas, setUserDatas] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValues, setSearchValues] = useState("");

  const [selectedDelete, setSelectedDelete] = useState(null);

  const handleReloadData = async () => {
    setIsLoading(true)
    const results = await fetchAllUsers(`Users?page=${userDatas.current}&search=${searchValues}`); 
    if(results !== null)
    {
      setUserDatas(results);
      setIsLoading(false)
    }
  };
  const handleClickPage = async (numPage) => {
    setIsLoading(true)
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
      setIsLoading(false);
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
  const handleEdit = (userID) => {
    setSelectedUser(userID);
  };
  const handleDelete = async () => {
    if (selectedDelete !== null) {
      const result = await fetchDeleteData(`Users/${selectedDelete}`);
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
      <div className="table-responsive">
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
                      <button
                            type="button"
                            className="btn text-danger dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => setSelectedDelete(user.user_id)}
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

      {/* Modal xóa dữ liệu */}
      <DeleteModal
        title={"Xóa dữ liệu người dung"}
        content={
          "Bạn có chắc chắn muốn xóa người dùng này? Sau khi xóa các thông tin liên quan như: Khóa học, bài làm... sẽ bị xóa."
        }
        onClose={() => setSelectedDelete(null)}
        onDelete={handleDelete}
      />
    </>
  );
}

export default UsersTable;
