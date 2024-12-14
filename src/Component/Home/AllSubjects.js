import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AllSubjects() {
  const apiURL = process.env.REACT_APP_API_URL;
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchAllSubjects = async () => {
      const response = await fetch(`${apiURL}/Subjects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
      const result = await response.json();
      if (result !== undefined) {
        setSubjects(result);
      }
    };
    fetchAllSubjects();
  }, [apiURL]);
  return (
    <div className="my-4">
      <h3 className="mb-3">Môn học phổ biến</h3>
      <div className="position-relative subject-topics">
        <div className="topics-container">
          {subjects.length === 0
            ? Array.from({ length: 8 }).map((_, index) => (
                <div className="topic-card placeholder" key={index}>
                  <div className="skeleton skeleton-text"></div>
                </div>
              ))
            : subjects.slice(0, 8).map((subject, index) => (
                  <NavLink
                    className="topic-card text-dark cursor-pointer"
                    key={index}
                    to={`courses/subject/${subject.subject_id}`}
                  >
                    {subject.subject_name}
                  </NavLink>
              ))}
        </div>
      </div>
    </div>
  );
}

export default AllSubjects;
