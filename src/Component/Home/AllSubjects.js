import React, { useEffect, useState } from "react";

function AllSubjects() {
    const apiURL = process.env.REACT_APP_API_URL;
    const [subjects, setSubjects] = useState([]);
    
    useEffect(() =>{
        const fetchAllSubjects = async () =>{
            const response = await fetch(`${apiURL}/Subjects`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(!response.ok)
                console.log(response.statusText);
            const result = await response.json();
            setSubjects(result);
        }
        fetchAllSubjects();
    },[apiURL])
  return (
    <div class="my-4">
      <h3 class="mb-3">Môn học phổ biến</h3>
      <div class="position-relative subject-topics">
        <div class="topics-container">
          {subjects.slice(0, 8).map((subject, index) => (
            <div class="topic-card" key={index}>{subject.subject_name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllSubjects;
