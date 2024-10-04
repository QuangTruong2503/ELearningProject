import React, { useEffect, useState } from "react";
import LoaderButton from "../../Component/Loader/LoaderButton";
import toast from "react-hot-toast";
const RegisterPage = () => {
    const apiURL = process.env.REACT_APP_API_URL;
    const [registerData, setRegisterData] = useState({
        "user_name": "",
        "last_name": "",
        "first_name": "",
        "email": "",
        "hashed_password": ""
      });
      const [confirmPassword, setConfirmPassword] = useState("");
      const [passwordMatch, setPasswordMatch] = useState(true);

      const [isLoading, setIsLoading] = useState(false);
      //Hàm cập nhật dữ liệu khi nhập
      const handleChangeData = (e) =>{
        const {name, value} = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
      }
      //Kiểm tra mật khẩu trùng khớp
      useEffect(() =>{
        if(confirmPassword !== registerData.hashed_password){
            setPasswordMatch(false);
        }
        else if(confirmPassword === registerData.hashed_password)
            setPasswordMatch(true);
        if(confirmPassword === "")
            setPasswordMatch(true)
      },[confirmPassword]);
      useEffect(() =>{
        console.log(registerData)
      },[registerData])
      //Post API dữ liệu
      const handleRegister = async (e) =>{
        e.preventDefault();
        try{
            setIsLoading(true);
            const response = await fetch(`${apiURL}/Users`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });
            if(!response.ok)
                console.log(response.statusText);
            const result = await response.json();
            if(!result.isSuccess){
                console.log(result);
                toast.error(result.message);
                return;
            }
            console.log(result);
            toast.error(result.message);
        }
        catch(err){
            console.error(err.message);
            setIsLoading(false)
        }
        finally{
            setIsLoading(false);
        }
      }
  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration rounded-2">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Đăng Ký Tài Khoản</h3>
                <form onSubmit={handleRegister}>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" htmlFor="userName">
                          Tên tài khoản
                        </label>
                        <input
                          id="userName"
                          type="text"
                          className="form-control form-control-lg"
                          name="user_name"
                          required
                          onChange={handleChangeData}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" htmlFor="password">
                          Mật khẩu
                        </label>
                        <input
                          id="password"
                          type="password"
                          className="form-control form-control-lg"
                          name="hashed_password"
                          onChange={handleChangeData}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" htmlFor="confirmPassword">
                          Xác nhận mật khẩu
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          className={`form-control form-control-lg ${passwordMatch? '' :'border-danger'}`}
                          required
                          onChange={e => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    {!passwordMatch&&
                        <p className="text-danger">Mật khẩu không trùng khớp</p>    
                    }
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          Họ và đệm
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg"
                          name="first_name"
                          required
                          onChange={handleChangeData}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" htmlFor="lastName">
                          Tên
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="form-control form-control-lg"
                          name="last_name"
                          required
                          onChange={handleChangeData}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div data-mdb-input-init className="form-outline">
                        <label className="form-label" htmlFor="emailAddress">
                          Email
                        </label>
                        <input
                          type="email"
                          id="emailAddress"
                          className="form-control form-control-lg"
                          name="email"
                          required
                          onChange={handleChangeData}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-12">
                    <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="user_role"
                          id="student"
                          value="0"
                          onClick={handleChangeData}
                        />
                        <label className="form-check-label" htmlFor="student">
                          Học sinh/ Sinh viên
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="user_role"
                          id="teacher"
                          value="1"
                          onClick={handleChangeData}
                        />
                        <label className="form-check-label" htmlFor="teacher">
                          Giáo viên
                        </label>
                      </div>
                    </div>
                  </div> */}
                  <div className="mt-4 pt-2 d-flex justify-content-center">
                    <button
                      data-mdb-ripple-init
                      className="btn btn-primary btn-lg w-75"
                      type="submit"
                    >ĐĂNG KÝ</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
