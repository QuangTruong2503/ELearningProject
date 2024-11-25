import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchExamByID } from "../../API/examsAPI";

function ExamDetail() {
    const {examID} = useParams();
    const [exam, setExam]=  useState({
        "exam_id": "",
        "exam_name": "",
        "total_score": 0,
        "exam_time": 0,
        "hide_result": false,
        "created_at": "",
        "finished_at": "",
        "course_id": ""
      })
    useEffect(() =>{
        const hanldeGetExam = async () =>{
            const result = await fetchExamByID(examID)
            if(result !== null)
            {
                setExam(result)
            }
        }
        hanldeGetExam();
        window.scrollTo(0, 0);
    },[examID])
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="exam-card">
          <h3 className="exam-title text-center">
            {exam.exam_name}
          </h3>
          <hr />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Thời gian bài kiểm tra:</strong> {exam.exam_time} phút
            </li>
            <li className="list-group-item">
              <strong>Điểm tối đa:</strong> {exam.total_score}
            </li>
            <li className="list-group-item">
              <strong>Ngày tạo:</strong> {new Date(exam.created_at).toLocaleDateString()}
            </li>
            <li className="list-group-item">
              <strong>Hạn kết thúc:</strong> {new Date(exam.finished_at).toLocaleString()}
            </li>
          </ul>
          <div className="text-center mt-4">
            <NavLink to={`quizz`} className="btn btn-primary start-btn">Bắt Đầu Kiểm Tra</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamDetail;
