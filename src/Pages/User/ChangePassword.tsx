import React, { useEffect, useState } from "react";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";

interface Password {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

function ChangePassword() {
  const [passwords, setPasswords] = useState<Password>({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [userID, setUserID] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  useEffect(() => {
    //Kiểm tra đăng nhập
    const handleVerifyLogin = async () => {
      const data = await fetchVerifyLogin();
      if (data !== null) {
        const userID = data.userID;
        setUserID(userID);
      }
    };
    handleVerifyLogin();
  }, []);
  const validatePassword = (password: string) => {
    // Kiểm tra mật khẩu có đủ dài và có ít nhất một số hoặc ký tự đặc biệt
    const minLength = password.length >= 8;
    const hasNumberOrSpecialChar = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    if (minLength && hasNumberOrSpecialChar) {
      setPasswordError("");
      setIsPasswordValid(true);
    } else {
      setPasswordError("Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất 1 số hoặc ký tự đặc biệt.");
      setIsPasswordValid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value
    }));

    // Nếu thay đổi mật khẩu mới hoặc mật khẩu xác nhận, kiểm tra tính hợp lệ
    if (name === "new_password" || name === "confirm_password") {
      validatePassword(value);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new_password !== passwords.confirm_password) {
      setPasswordError("Mật khẩu xác nhận không khớp.");
      setIsPasswordValid(false);
      return;
    }

    if (isPasswordValid) {
      // Logic thay đổi mật khẩu thành công
      alert("Mật khẩu đã được thay đổi thành công!");
    }
  };

  return (
    <div className="d-flex flex-column">
      <h5 className="my-3">Đổi mật khẩu</h5>
      <div className="d-flex flex-column justify-content-start gap-1 flex-lg-row flex-md-row h-100 ms-2 p-3">
        <form className="d-flex flex-column w-50" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Mật khẩu cũ</label>
            <input
              type={showPassword ? "text" : "password"}
              name="current_password"
              value={passwords.current_password}
              onChange={handleChange}
              className="form-control"
              placeholder="Nhập mật khẩu cũ"
            />
          </div>
          <div className="form-group mb-3">
            <label>Mật khẩu mới</label>
            <input
              type={showPassword ? "text" : "password"}
              name="new_password"
              value={passwords.new_password}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div className="form-group mb-3">
            <label>Xác nhận</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              value={passwords.confirm_password}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
          {passwordError && (
            <div className="text-danger mb-2">
              <small>{passwordError}</small>
            </div>
          )}
          <div className="form-check mt-2 mb-3">
            <input
              className="form-check-input cursor-pointer"
              type="checkbox"
              id="flexCheckDefault"
              onChange={handleShowPassword}
            />
            <label className="form-check-label cursor-pointer" htmlFor="flexCheckDefault">
              Hiện mật khẩu
            </label>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!isPasswordValid}>
            Xác nhận
          </button>
        </form>
        <div className="vertical-line d-none d-lg-block d-md-block"></div>
        <div className="fs-6 text-dark-emphasis d-flex flex-column justify-content-center gap-1">
          <strong className="text-black mb-2">Mật khẩu của bạn</strong>
          <span>Phải từ 8 ký tự trở lên</span>
          <span>Nên có ít nhất 1 số hoặc 1 ký tự đặc biệt</span>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
