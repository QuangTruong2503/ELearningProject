import React, { useEffect, useState } from "react";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";
import {fetchJoinCourseByInviteCode} from '../../API/enrollmentsAPI.js'
import { toast } from "react-toastify";
import LoaderButton from "../Loader/LoaderButton.js";
function AttendCourse() {
    const [userData, setUserData] = useState({})
    const [inviteCode, setInviteCode] = useState('')
    const [onActing, setOnActing] = useState(false);
    //Tham gia khóa học
    const handleJoinCourse = async (e) =>{
        e.preventDefault();
        setOnActing(true);
        const result = await fetchJoinCourseByInviteCode(inviteCode, userData.userID)
        if(result !== null)
        {
            if(result.success)
            {
                setOnActing(false)
            setInviteCode('')
                toast.success(result.message);
                return
            }
            else{
                setOnActing(false)
            setInviteCode('')
                toast.error(result.message)
                return;
            }
            
        }
    }
    //Kiểm tra login
    useEffect(() =>{
        const handleVerifyLogin = async () => {
            const data = await fetchVerifyLogin();
            //Nếu vai trò là student thì trở về màn hình chính
            if (data !== undefined) {
              setUserData(data)
            }
          };
          handleVerifyLogin();
    }, []);
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Nhập mã
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Tham gia khóa học
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body h-auto">
              <form className="d-flex flex-column align-items-center gap-3" onSubmit={handleJoinCourse}>
                <div className="w-75">
                  <label
                    htmlFor="attendCode"
                    className="form-label fw-semibold"
                  >
                    Nhập mã
                  </label>
                  <input
                    id="attendCode"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Nhập mã khóa học của bạn"
                    aria-describedby="codeHelp"
                    required
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                  />
                  <small id="codeHelp" className="form-text text-muted">
                    Mã được người quản lý khóa học cung cấp.
                  </small>
                </div>
                {onActing &&(
                <button disabled className="btn btn-primary btn-lg px-4 mt-2">
                  <LoaderButton />
                </button>
                )}
                {!onActing &&(
                <button type="submit" className="btn btn-primary btn-lg px-4 mt-2">
                  Tham gia
                </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendCourse;
