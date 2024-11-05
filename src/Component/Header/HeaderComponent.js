import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import AccountButton from "./AccountButton";
function HeaderComponent() {
  const loginCookiesName = "loginData";
  const loginCookies = Cookies.get(loginCookiesName);
  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container">
        <a className="navbar-brand text-primary fs-3" href="/">
          E-Learning
        </a>
        <button
          className="navbar-toggler text-primary"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {loginCookies === undefined && (
            <div className="d-flex gap-2">
              <NavLink className="btn btn-outline-primary" to={"/register"}>
                Đăng ký
              </NavLink>
              <NavLink className="btn btn-outline-primary" to={"/login"}>
                Đăng nhập
              </NavLink>
            </div>
          )}
          {loginCookies !== undefined && (
            <AccountButton />
          )}
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;
