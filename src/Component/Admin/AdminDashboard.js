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
          <div className="accordion-item border-0" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-light text-dark"
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
              <div className="accordion-body p-0">
                <ul className="list-group">
                  {item.data.map((dataItem, dataIndex) => (
                    <li
                      className="list-group-item border-0 p-2"
                      key={dataIndex}
                    >
                      <NavLink
                        to={dataItem.url}
                        className="nav-link d-flex align-items-center text-decoration-none text-primary"
                      >
                        <span className="d-none d-lg-block">
                          {dataItem.name}
                        </span>
                        {/* Hiển thị trong offcanvas và tự đóng khi nhấn */}
                        <span data-bs-dismiss="offcanvas" className="d-lg-none">
                          {dataItem.name}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ul>
  );
}

export default AdminDashboard;
