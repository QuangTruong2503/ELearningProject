import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import UserDetail from "../../Pages/Admin/Users/UserDetail";
function UsersTable({users, reloadData}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleEdit = (userID) =>{
    setSelectedUser(userID);
  }
  const handleReloadData = () =>{
    reloadData();
  }
  return (
    <>
      <h1>DANH SÁCH THÀNH VIÊN</h1>
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
          {users.map((user, index) => (
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
                    <FontAwesomeIcon icon={faGear}/>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item text-success" type="button" onClick={() => handleEdit(user.user_id)}>
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
      {selectedUser &&(
        <UserDetail userID={selectedUser} onClose={() => setSelectedUser(null)} onSave={handleReloadData} />
      )}
    </>
  );
}

export default UsersTable;
