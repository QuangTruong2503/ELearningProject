import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  fetchCheckUserInCourseByExamID,
  fetchExamByID,
} from "../../API/examsAPI";
import {
  fetchNewSubmission,
  fetchSubmissionByExamAndUser,
} from "../../API/submissionsAPI";
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
  const [submission, setSubmission] = useState({
    submission_id: "",
    exam_id: "",
    student_id: "",
    started_at: "",
    submitted_at: "",
    scores: 0,
  });
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
        //Kiểm tra người dùng có ở trong khóa học không với examID
        const checkResult = await fetchCheckUserInCourseByExamID(
          data.userID,
          examID
        );
        if (checkResult !== null) {
          if (!checkResult.success) {
            toast.error(checkResult.message);
            navigate(`/course/${checkResult.courseID}`)
          }
        }
        const submissionResult = await fetchSubmissionByExamAndUser(
          examID,
          data.userID
        );
        if (submissionResult !== null) {
          if(submissionResult.success)
          {
            setSubmission(submissionResult.data);
          }
          else{
            setSubmission(null)
          }
        }
      }
    };
    handleVerifyLogin();
    window.scrollTo(0, 0);
  }, [examID, navigate]);
  const handleJoinExam = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      exam_id: examID,
      student_id: userData.userID,
      started_at: new Date().toISOString(),
      submitted_at: null,
      scores: 0,
    };
    const result = await fetchNewSubmission(data);
    if (result !== null) {
      if (result.isTesting !== null && result.isTesting) {
        navigate(`/quizz/${result.submissionID}`);
      }
      if (result.success) {
        navigate(`/quizz/${result.submissionID}`);
        return;
      } else if (!result.success) {
        toast.warning(result.message);
        setIsLoading(false);
        return;
      }
    }
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="exam-card shadow border-radius-lg bg-white p-4">
          <h3 className="exam-title text-center text-primary mb-4">
            {exam.exam_name}
          </h3>
          <div className="exam-details mb-4">
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong className="text-muted">Thời gian bài kiểm tra:</strong>{" "}
                {exam.exam_time} phút
              </li>
              <li className="mb-2">
                <strong className="text-muted">Điểm tối đa:</strong>{" "}
                {exam.total_score}
              </li>
              <li className="mb-2">
                <strong className="text-muted">Ngày tạo:</strong>{" "}
                {new Date(exam.created_at).toLocaleDateString()}
              </li>
              <li className="mb-2">
                <strong className="text-muted">Hạn kết thúc:</strong>{" "}
                {new Date(exam.finished_at).toLocaleString()}
              </li>
            </ul>
          </div>
          <hr></hr>
          {/* Kết quả bài thi (nếu có) */}
          {submission === null ? (<small>Bạn chưa có bài kiểm tra nào</small>) : (
            <div className="exam-results mt-4">
              <h5 className="mb-3">Kết quả</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Điểm: </strong> {submission.scores}
                </li>
                <li className="mb-2">
                  <strong>Nộp bài lúc: </strong>{" "}
                  {new Date(submission.submitted_at).toLocaleString()}
                </li>
                <li>
                  <NavLink
                    to="#"
                    className="text-primary text-decoration-underline"
                  >
                    Xem chi tiết
                  </NavLink>
                </li>
              </ul>
            </div>
          )}

          <form className="text-center mt-5" onSubmit={handleJoinExam}>
            {isLoading ? (
              <button
                disabled
                className="btn btn-primary w-100 py-3 d-flex justify-content-center align-items-center"
              >
                <LoaderButton />
              </button>
            ) : (
              <button type="submit" className="btn btn-primary w-100">
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
