import React from "react";
import { NavLink } from "react-router-dom";

function ManageCourseDashboard({
  data = [
    {
      name: "",
      url: "",
    },
  ],
}) {
  return (
    <ul className="nav flex-column">
      <div className="accordion accordion-flush" id="accordionDashboard">
        {data.map((item, index) => (
          <li className="nav-item mb-2" key={index}>
            <NavLink
              to={item.url}
              className="nav-link d-flex align-items-center"
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </div>
    </ul>
  );
}

export default ManageCourseDashboard;
