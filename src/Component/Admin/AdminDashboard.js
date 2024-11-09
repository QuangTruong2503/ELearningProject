import React from "react";
import { NavLink } from "react-router-dom";

function AdminDashboard({
  data = [
    {
      title: "",
      data: [{ name: "", url: "" }],
    },
  ],
}) {
  return (
    <ul className="nav flex-column">
      <div className="accordion accordion-flush" id="accordionDashboard">
        {data.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse-${index}`}
                aria-expanded="true"
                aria-controls={`flush-collapse-${index}`}
              >
                {item.title}
              </button>
            </h2>
            <div
              id={`flush-collapse-${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordionDashboard"
            >
              <div className="accordion-body">
                {item.data.map((dataItem, dataIndex) => (
                    <li className="nav-item mb-2" key={dataIndex}>
                    <NavLink
                      to={dataItem.url}
                      className="nav-link d-flex align-items-center"
                    >
                      {dataItem.name}
                    </NavLink>
                  </li>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ul>
  );
}

export default AdminDashboard;
