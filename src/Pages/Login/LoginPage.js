import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoaderButton from '../../Component/Loader/LoaderButton.js';
export const LoginPage = () => {
    const apiURL= process.env.REACT_APP_API_URL;
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
            const response = await fetch(`${apiURL}/Login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData),
            });
            if(!response.ok){
                const result = await response.json();
                console.log(response.status())
                toast.error(result.message);
                return;
            }
            const result = await response.json();
            if(!result.isLogin)
                return toast.error(result.message);
            toast.success(result.message)
            console.log(result);
        }
        catch(err){
            console.error(err.message);
            setIsLoading(false)
        }
        finally{
            setIsLoading(false)
        }

    }
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
                <a className="text-decoration-none" href="/login">Tạo tài khoản mới</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};
