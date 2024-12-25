import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ManageDashboard({
  data = [
    {
      name: "",
      url: "",
    },
  ],
}) 

{
  const checkIfHrefContains = (url) => {
    // Lấy href hiện tại từ window.location.href
    const currentHref = window.location.href;
  
    // So sánh nếu href hiện tại chứa chuỗi url
    return currentHref.includes(url);
  };
  return (
    <ul className="nav flex-column">
      <div className="accordion accordion-flush d-none d-lg-block" id="accordionDashboard">
        {data.map((item, index) => (
          <li className={`nav-item  mb-2 ${checkIfHrefContains(item.url) ? 'manage-course--item-focus' : ''}`} key={index}>
            <NavLink
              to={item.url}
              className="nav-link text-black d-flex align-items-center w-auto"
            >
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </div>
      <div className="accordion accordion-flush d-lg-none" id="accordionDashboard">
        {data.map((item, index) => (
          <li data-bs-dismiss="offcanvas" className={`nav-item mb-2 ${checkIfHrefContains(item.url) ? 'manage-course--item-focus' : ''}`} key={index}>
            <NavLink
              to={item.url}
              className="nav-link d-flex align-items-center w-auto"
            >
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </div>
    </ul>
  );
}

export default ManageDashboard;
