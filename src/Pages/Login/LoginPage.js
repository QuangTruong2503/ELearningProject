import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoaderButton from '../../Component/Loader/LoaderButton.js';
import { NavLink } from "react-router-dom";
import {handleFetchLogin} from '../../API/loginAPI.js';
import setCookies from "../../Helpers/Cookies.js";
import Cookies from 'js-cookie';
export const LoginPage = () => {
    const loginCookies = Cookies.get('loginToken');

    const [isLoading, setIsLoading] = useState(false)
    const [loginData, setLoginData] = useState({
        userNameOrEmail: '',
        password: '',
    });
    const handleChangeData = (event) =>{
        const {name, value} = event.target;
        setLoginData((prev) =>({
            ...prev,
            [name]: value,
        }));
    }
    const handleClick = async (e) =>{
        e.preventDefault();
        try{
            setIsLoading(true)
            const result = await handleFetchLogin(loginData);
            if(result === undefined){
              toast.error("Gặp lỗi khi đăng nhập.");
              return;
            }
            if(!result.isLogin)
              return toast.error(result.message);
            toast.success(result.message)
            console.log(result);
            setCookies('loginToken', result.token);
            setCookies('isLogin', result.isLogin);
            return;

        }
        catch(err){
            console.error(err.message);
            setIsLoading(false)
        }
        finally{
            setIsLoading(false)
        }

    };
    useEffect(() =>{
      if(loginCookies !== undefined){
        setTimeout(() =>{
          window.location.href = '/';
        }, 1000)
      }
    }, [loginCookies])
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Login"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleClick}>
              <div data-mdb-input-init className="form-outline mb-4">
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

              <div data-mdb-input-init className="form-outline mb-4">
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

              <div className="d-flex justify-align-content-end align-items-center mb-4">
                <a href="/login">Forgot password?</a>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary w-75 py-2 fs-5"
                >
                  {!isLoading&& 'ĐĂNG NHẬP'}
                  {isLoading&& <LoaderButton />}
                </button>
              </div>

              <div className="divider d-flex align-items-center justify-content-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">Hoặc</p>
              </div>
              <div className="d-flex justify-content-center align-items-center mb-4 ">
                <NavLink className="text-decoration-none" to="/register">Tạo tài khoản mới</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};
