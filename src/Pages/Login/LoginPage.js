import React, { useEffect, useState } from "react";
import LoaderButton from "../../Component/Loader/LoaderButton.js";
import { NavLink } from "react-router-dom";
import { handleFetchLogin } from "../../API/loginAPI.js";
import setCookies from "../../Helpers/Cookies.js";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
export const LoginPage = () => {
  const loginCookies = Cookies.get("loginToken");

  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    userNameOrEmail: "",
    password: "",
  });
  //Cập nhật dữ liệu khi nhập liệu
  const handleChangeData = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //Đăng nhập
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await handleFetchLogin(loginData);
      if (result === undefined) {
        toast.error("Gặp lỗi khi đăng nhập.");
        return;
      }
      if (!result.isLogin) return toast.error(result.message);
      else{
        const convertData = JSON.stringify(result.data);
        setCookies("loginData", convertData);
        toast.success(result.message);
        setTimeout(() =>{
          window.location.href = '/';
        }, 1000)
      }
    } catch (err) {
      console.error(err.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (loginCookies !== undefined) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, [loginCookies]);
  return (
    <section className="d-flex align-items-center">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100 form-animation">
          <div className="col-12 col-lg-8 col-xl-6">
            <div className="card shadow border-0 rounded-4 p-4 bg-white">
              <div className="text-center mb-4">
                <h3 className="text-primary">ĐĂNG NHẬP</h3>
              </div>
              <form onSubmit={handleClick}>
                <div className="mb-4">
                  <label className="form-label" htmlFor="userNameOrEmail">
                    Tài khoản hoặc email
                  </label>
                  <input
                    type="text"
                    id="userNameOrEmail"
                    className="form-control form-control-lg"
                    name="userNameOrEmail"
                    required
                    onChange={handleChangeData}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="password">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    name="password"
                    required
                    onChange={handleChangeData}
                  />
                </div>

                <div className="d-flex justify-content-end mb-4">
                  <a href="/login" className="text-decoration-none">
                    Quên mật khẩu?
                  </a>
                </div>

                <div className="d-flex justify-content-center mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-75 py-2 fs-5"
                  >
                    {!isLoading && "ĐĂNG NHẬP"}
                    {isLoading && <LoaderButton />}
                  </button>
                </div>

                <div className="divider d-flex align-items-center justify-content-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">
                    Hoặc
                  </p>
                </div>

                <div className="d-flex justify-content-center">
                  <NavLink className="text-decoration-none" to="/register">
                    Tạo tài khoản mới
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
