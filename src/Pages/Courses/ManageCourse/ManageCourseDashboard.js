import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function ManageCourseDashboard({
  data = [
    {
      name: "",
      url: "",
    },
  ],
}) 
{
  const [lastPart, setLastPart] = useState('');
  const hash = window.location.hash; // Lấy phần hash từ URL
  useEffect(() =>{
    const parts = hash.split('/'); // Tách chuỗi theo dấu '/'
    const lastPart = parts[parts.length - 1]; // Phần cuối là "details"
    setLastPart(lastPart)
  },[hash])
  return (
    <ul className="nav flex-column">
      <div className="accordion accordion-flush d-none d-lg-block" id="accordionDashboard">
        {data.map((item, index) => (
          <li className={`nav-item  mb-2 ${lastPart === item.url ? 'manage-course--item-focus' : ''}`} key={index}>
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
          <li data-bs-dismiss="offcanvas" className={`nav-item mb-2 ${lastPart === item.url ? 'manage-course--item-focus' : ''}`} key={index}>
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

export default ManageCourseDashboard;
