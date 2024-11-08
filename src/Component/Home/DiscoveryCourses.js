import React, { useEffect, useState } from 'react'
import { fetchCoursesPublicBySubject } from '../../API/coursesAPI';
import CarouselCard from './CarouselCard.js';
function DiscoveryCourses() {
    const [mathCourses, setMathCourses] = useState([]);
    const [historyCourses, setHistoryCourses] = useState([]);
    const [englishCourses, setEnglishCourses] = useState([]);
    useEffect(() =>{
        const getCoursesPublicBySubject = async () =>{
            const math = await fetchCoursesPublicBySubject('math');
            setMathCourses(math);
        }
        getCoursesPublicBySubject();
    },[])
    useEffect(() =>{
        if(mathCourses.length !== 0)
            console.log(mathCourses);
    },[mathCourses])
  return (
    <div className='my-4 discovery-courses'>
        
        {mathCourses.length !== 0 && (
            <div className='discovery-courses--item'>
                <h4>Các Khóa học môn Toán</h4>
                <CarouselCard courseData={mathCourses}/>
            </div>
        )}
    </div>
  )
}

export default DiscoveryCourses