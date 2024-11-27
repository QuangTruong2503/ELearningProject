import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchExamByID } from "../../API/examsAPI";
import { fetchNewSubmission } from "../../API/submissionsAPI";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin";
import { toast } from "react-toastify";
import LoaderButton from "../../Component/Loader/LoaderButton";

function ExamDetail() {
  const { examID } = useParams();
  const [exam, setExam] = useState({
    exam_id: "",
    exam_name: "",
    total_score: 0,
    exam_time: 0,
    hide_result: false,
    created_at: "",
    finished_at: "",
    course_id: "",
  });
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    const hanldeGetExam = async () => {
      const result = await fetchExamByID(examID);
      if (result !== null) {
        setExam(result);
      }
    };
    hanldeGetExam();
    //Kiem tra token
    const handleVerifyLogin = async () => {
      const data = await fetchVerifyLogin();
      if (data !== null) {
        setUserData(data);
      }
    };
    handleVerifyLogin();
    window.scrollTo(0, 0);
  }, [examID]);
  const handleJoinExam = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      "exam_id": examID,
      "student_id": userData.userID,
      "started_at": new Date().toISOString(),
      "submitted_at": null,
      "scores": 0
    }
    const result = await fetchNewSubmission(data);
    if (result !== null) {
      if(result.isTesting !== null && result.isTesting){
        navigate(`/quizz/${result.submissionID}`)
      }
      if (result.success) {
        navigate(`/quizz/${result.submissionID}`);
        return
      } else if(!result.success) {
        toast.warning(result.message);
        setIsLoading(false);
        return;
      }
      
    }
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="exam-card">
          <h3 className="exam-title text-center">{exam.exam_name}</h3>
          <hr />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Thời gian bài kiểm tra:</strong> {exam.exam_time} phút
            </li>
            <li className="list-group-item">
              <strong>Điểm tối đa:</strong> {exam.total_score}
            </li>
            <li className="list-group-item">
              <strong>Ngày tạo:</strong>{" "}
              {new Date(exam.created_at).toLocaleDateString()}
            </li>
            <li className="list-group-item">
              <strong>Hạn kết thúc:</strong>{" "}
              {new Date(exam.finished_at).toLocaleString()}
            </li>
          </ul>
          <form className="text-center mt-4" onSubmit={handleJoinExam}>
            {isLoading ? (
              <button disabled className="btn btn-primary start-btn">
                <LoaderButton />
              </button>
            ) : (
              <button type="submit" className="btn btn-primary start-btn">
                Bắt Đầu Kiểm Tra
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExamDetail;
