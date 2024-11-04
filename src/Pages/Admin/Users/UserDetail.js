import React, { useEffect, useState } from 'react'
import { fetchUpdateUserByID, fetchUserByID } from '../../../API/user';
import SpinnerLoader from '../../../Component/Loader/SpinnerLoader.js'
import LoaderButton from '../../../Component/Loader/LoaderButton.js'
function UserDetail({userID, onClose, onSave}) {
    const [formData, setFormData] = useState({
        user_id: '',
        user_name: '',
        last_name: '',
        first_name: '',
        email: '',
        created_at: '',
        role_id: ''
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    const [dataEmpty, setDataEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null)
    //Cập nhật dữ liệu người dùng
    const handleSubmit = async (e) =>{
      e.preventDefault();
      setIsSaving(true);
      const result = await fetchUpdateUserByID(formData);
      if(result !== undefined)
      {
        setIsSaving(false);
        setMessage({
          message: result.message,
          isSuccess: result.isSuccess
        })
        //Tải lại dữ liệu bảng khi thay đổi thành công
        onSave();
      }
    }

    //Lấy dữ liệu người dùng
    useEffect(() =>{
      //Lấy dữ liệu người dùng theo ID người dùng
      const handleFetchUserByID = async () =>{
        const result = await fetchUserByID(userID);
        if(result.data === undefined)
        {
            setIsLoading(false);
            setDataEmpty(true);
            return;
        }
        const data = result.data;
        setFormData({
            user_id: data.user_id,
            user_name: data.user_name,
            last_name: data.last_name,
            first_name: data.first_name,
            email: data.email,
            created_at: data.created_at,
            role_id: data.role_id
        })
        setIsLoading(false);
    }
    handleFetchUserByID();
    },[userID])
  return (
    <div className="modal show d-block modal-background" tabIndex="-1">
      <div className="modal-dialog">
        {isLoading && !dataEmpty && (
            <div className='modal-content'>
              <SpinnerLoader />
            </div>
        )}
        {!isLoading && !dataEmpty &&(
          <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Thông Tin Người Dùng</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Tên tài khoản</label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Họ</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Tên</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Vai trò</label>
                <select
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {message && (
                <p className={message.isSuccess? 'text-success' : 'text-danger'}>{message.message}</p>
              )}
              {/* Button lưu dữ liệu */}
              <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary p-2 w-50">{isSaving? <LoaderButton /> : 'Lưu thay đổi'}</button>
              </div>
            </form>
          </div>
        </div>
        )}
        {!isLoading && dataEmpty && (
          <div className='text-center'>
              <h3>Không có dữ liệu người dùng!</h3> 
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDetail