import React, { useEffect, useState } from "react";
import LoaderButton from "../../Component/Loader/LoaderButton";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { checkAccountExists, registerAccount } from "../../API/registerAPI";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    user_name: "",
    last_name: "",
    first_name: "",
    email: "",
    hashed_password: "",
    role_id: "",
  });
  //Dữ liệu vai trò
  const roleList = [
    { value: "student", name: "Học sinh/sinh viên" },
    { value: "teacher", name: "Giáo viên" },
  ];
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [checkAvailable, setCheckAvailable] = useState(false); //Kiểm tra tài khoản không tồn tại sẽ được đăng ký tiếp
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  //Hàm cập nhật dữ liệu khi nhập
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //Kiểm tra mật khẩu trùng khớp
  useEffect(() => {
    if (confirmPassword !== registerData.hashed_password) {
      setPasswordMatch(false);
    } else if (confirmPassword === registerData.hashed_password)
      setPasswordMatch(true);
    if (confirmPassword === "") setPasswordMatch(true);
  }, [confirmPassword, registerData.hashed_password]);

  //Kiểm tra tài khoản tồn tại trong database
  const hanldeCheckAccount = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    const username = registerData.user_name;
    const email = registerData.email;
    const result = await checkAccountExists(username, email);
    if (result.isSuccess === false) {
      setErrorMessage(result.message);
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
      setErrorMessage("");
      setCheckAvailable(true);
      return;
    }
  };

  //Đăng ký tài khoản
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await registerAccount(registerData);
      if (!result.isSuccess) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="min-vh-100 d-flex align-items-center">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100 form-animation">
          <div className="col-12 col-lg-8 col-xl-6">
            <div className="card shadow border-0 rounded-4 p-5 bg-white">
              <div className="text-center mb-4">
                <h3 className="text-primary">Đăng Ký Tài Khoản</h3>
              </div>
              {!checkAvailable ? (
                <form onSubmit={hanldeCheckAccount}>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="userName">
                      Tên tài khoản
                    </label>
                    <input
                      id="userName"
                      type="text"
                      className="form-control"
                      name="user_name"
                      required
                      onChange={handleChangeData}
                      value={registerData.user_name}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="emailAddress">
                      Email
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      className="form-control"
                      name="email"
                      required
                      onChange={handleChangeData}
                      value={registerData.email}
                    />
                  </div>
                  {errorMessage && (
                    <div className="text-danger mb-3">{errorMessage}</div>
                  )}
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary btn-lg w-75"
                      type="submit"
                    >
                      {isLoading ? <LoaderButton /> : "Đăng Ký"}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister}>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="firstName">
                      Họ
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      name="first_name"
                      required
                      onChange={handleChangeData}
                      value={registerData.first_name}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="lastName">
                      Tên
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      name="last_name"
                      required
                      onChange={handleChangeData}
                      value={registerData.last_name}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="password">
                      Mật khẩu
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={`form-control ${
                        passwordMatch ? "" : "border-danger"
                      }`}
                      name="hashed_password"
                      required
                      onChange={handleChangeData}
                      value={registerData.hashed_password}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="confirmPassword">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      className={`form-control ${
                        passwordMatch ? "" : "border-danger"
                      }`}
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {!passwordMatch && (
                    <p className="text-danger">Mật khẩu không trùng khớp</p>
                  )}
                  <div className="mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="showPasswordCheckbox"
                      onChange={togglePasswordVisibility}
                      checked={showPassword}
                    />
                    <label
                      htmlFor="showPasswordCheckbox"
                      className="ms-2 form-check-label"
                    >
                      Hiển thị mật khẩu
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="selectRole">
                      Chọn vai trò
                    </label>
                    <select
                      id="selectRole"
                      className="form-select"
                      required
                      onChange={handleChangeData}
                      name="role_id"
                      value={registerData.role_id}
                    >
                      <option value="" disabled>
                        Chọn vai trò
                      </option>
                      {roleList.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary btn-lg w-75"
                      type="submit"
                    >
                      {isLoading ? <LoaderButton /> : "Đăng Ký"}
                    </button>
                  </div>
                </form>
              )}
              <div className="divider d-flex align-items-center justify-content-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">
                  Đã có tài khoản?
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <NavLink
                  className="text-decoration-none text-primary"
                  to="/login"
                >
                  Đăng nhập tài khoản
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default RegisterPage;
