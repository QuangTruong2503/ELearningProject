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

interface Exam {
  exam_id: string;
  exam_name: string;
  total_score: number;
  exam_time: number;
  hide_result: boolean;
  created_at: string;
  finished_at: string;
  course_id: string;
}

interface UserData {
  userID: string;
  [key: string]: any; // Add additional properties if needed
}

interface Submission {
  submission_id: string;
  exam_id: string;
  student_id: string;
  started_at: string;
  submitted_at: string | null;
  scores: number;
}

const ExamDetail: React.FC = () => {
  const { examID } = useParams<{ examID: string }>();
  const [exam, setExam] = useState<Exam | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getExamDetails = async () => {
      const result = await fetchExamByID(examID || "");
      if (result) setExam(result);
    };

    const verifyUserLogin = async () => {
      const data = await fetchVerifyLogin();
      if (data) {
        setUserData(data);

        const checkUser = await fetchCheckUserInCourseByExamID(
          data.userID,
          examID || ""
        );
        if (checkUser && !checkUser.success) {
          toast.error(checkUser.message);
          navigate(`/course/${checkUser.courseID}`);
          return;
        }

        const submissionData = await fetchSubmissionByExamAndUser(
          examID || "",
          data.userID
        );
        if (submissionData) {
          setSubmission(submissionData.success ? submissionData.data : null);
        }
      }
    };

    getExamDetails();
    verifyUserLogin();
    window.scrollTo(0, 0);
  }, [examID, navigate]);

  const handleJoinExam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!userData) return;

    const newSubmissionData = {
      exam_id: examID || "",
      student_id: userData.userID,
      started_at: new Date().toISOString(),
      submitted_at: null,
      scores: 0,
    };

    const result = await fetchNewSubmission(newSubmissionData);
    if (result) {
      if (result.isTesting || result.success) {
        navigate(`/quizz/${result.submissionID}`);
        return;
      }
      toast.warning(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        {exam === null ? (
          <div className="exam-card shadow border-radius-lg bg-white p-4 h-50">
            <span className="placeholder col-6"></span>
            <span className="placeholder w-75"></span>
            <span className="placeholder" style={{ width: "25%" }}></span>
          </div>
        ) : (
          <div className="exam-card shadow border-radius-lg bg-white p-4">
            <h3 className="exam-title text-center text-primary mb-4">
              {exam.exam_name}
            </h3>
            <div className="exam-details mb-4">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong className="text-muted">
                    Thời gian bài kiểm tra:
                  </strong>{" "}
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
            <hr />
            {submission ? (
              <div className="exam-results mt-4">
                <h5 className="mb-3">Kết quả</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>Điểm: </strong> {submission.scores}
                  </li>
                  <li className="mb-2">
                    <strong>Nộp bài lúc: </strong>{" "}
                    {submission.submitted_at &&
                      new Date(submission.submitted_at).toLocaleString()}
                  </li>
                  <li>
                    <NavLink
                      to={`/exam/result/${submission.submission_id}`}
                      className="text-primary text-decoration-underline"
                    >
                      Xem chi tiết
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : (
              <small>Bạn chưa có bài kiểm tra nào</small>
            )}
            <form className="text-center mt-5" onSubmit={handleJoinExam}>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? <LoaderButton /> : "Bắt Đầu Kiểm Tra"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamDetail;
