import React, { useState } from "react";
import { fetchConfirmPassForDelete } from "../../../API/coursesAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderButton from '../../../Component/Loader/LoaderButton.js'
function FinishCourse() {
  const { courseID } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //Xác nhận mật khẩu để xóa khóa học
  const handleConfirm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await fetchConfirmPassForDelete(courseID, password);
      if (result !== null) {
        if(result.success)
        {
          toast.success(result.message);
          navigate('/my-courses')
        }
        else{
          toast.error(result.message)
        }
      }
    } catch (ex) {
      console.error(ex.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="container" onSubmit={handleConfirm}>
      <div className="col-lg-4 col-md-6">
        <label htmlFor="password" className="form-label fw-semibold">
          Mật khẩu
        </label>

        <input
          id="password"
          className="form-control"
          type="password"
          placeholder="Nhập mật khẩu"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <small id="codeHelp" className="form-text text-muted">
          Nhập mật khẩu để xác nhận kết thúc khóa học
        </small>
      </div>
      {isLoading ? (
        <button disabled className="btn btn-danger mt-2 text-light">
          <LoaderButton />
        </button>
      ) : (
        <button type="submit" className="btn btn-danger mt-2">
          Xóa
        </button>
      )}
    </form>
  );
}

export default FinishCourse;
