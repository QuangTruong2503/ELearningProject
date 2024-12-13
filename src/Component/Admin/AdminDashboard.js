import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AdminDashboard({
  data = [
    {
      title: "",
      data: [{ name: "", url: "" }],
    },
  ],
}) {
  const [path, setPath] = useState("");
  const url = new URL(window.location.href);
  const hash = url.hash;
  useEffect(() => {
    

    // Loại bỏ dấu `#` và lấy phần "users/all"
    const path = hash.substring(1); // "/admin/users/all"
    const targetPath = path.split("/").slice(2).join("/"); // "users/all"

    setPath(targetPath); // "users/all"
  }, [hash]);
  return (
    <ul className="nav flex-column list-unstyled">
      <li className={`py-2 mb-2 d-none d-lg-block ${
                    path === 'dashboard' ? "manage-course--item-focus px-2" : ""
                  }`}>
      <NavLink className={'text-black d-flex gap-2 align-items-center'} to={`dashboard`}>
        <FontAwesomeIcon icon={faChartPie}/>
        <span>Dashboard</span>
      </NavLink>
      {/* Dành cho màn nhỏ khi nhấn sẽ ẩn canvas */}
      </li>
      <li data-bs-dismiss="offcanvas" className={`py-2 mb-2 d-block d-lg-none ${
                    path === 'dashboard' ? "manage-course--item-focus px-2" : ""
                  }`}>
      <NavLink className={'text-black d-flex gap-2 align-items-center'} to={`dashboard`}>
        <FontAwesomeIcon icon={faChartPie}/>
        <span>Dashboard</span>
      </NavLink>
      </li>
        {data.map((item, index) => (
          <div className="my-1 " key={index}>
            <div className="d-flex gap-2 align-items-center">
            <strong>{item.title}</strong>
            </div>
            <ul className="list-unstyled p-2 ">
              {item.data.map((content, contentIndex) => (
                <div>
                  <li
                  className={`p-2 ms-3 mb-2 d-none d-lg-block ${
                    path === content.url ? "manage-course--item-focus" : ""
                  }`}
                  key={contentIndex}
                >
                  <NavLink className={'text-black'} to={content.url}>{content.name}</NavLink>
                </li>
                {/* Dành cho màn nhỏ khi nhấn sẽ ẩn canvas */}
                <li
                  data-bs-dismiss="offcanvas"
                  className={`p-2 ms-3 mb-2 d-lg-none d-block ${
                    path === content.url ? "manage-course--item-focus" : ""
                  }`}
                  key={contentIndex}
                >
                  <NavLink className={'text-black'} to={content.url}>{content.name}</NavLink>
                </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
    </ul>
  );
}

export default AdminDashboard;
