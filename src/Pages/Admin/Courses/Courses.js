import React, { useEffect, useState } from "react";
import CoursesTable from '../../../Component/Table/CoursesTable.js'
import { fetchCourses } from "../../../API/coursesAPI.js";

function Courses() {
  const [data, setData] = useState([]);
  const handleGetCourses = async () =>{
      const results = await fetchCourses('Courses');
      if(results === undefined){
          console.error("Không có dữ liệu")
          return;
      }
      setData(results);
  }
  useEffect(() =>{
    handleGetCourses();
  },[])
  return (
    <CoursesTable data={data} reloadData={handleGetCourses}/>
  )
}

export default Courses