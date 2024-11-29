import React, { useState, useEffect } from "react";
import "../../CssFolder/Exam.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuestionNoCorrectAnswer } from "../../API/questionAPI";

import { fetchExamByID } from "../../API/examsAPI.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import CountdownTimer from "./CountDownTimer.js";
import { fetchVerifyLogin } from "../../Helpers/VerifyLogin.js";
import {
  fetchInsertAnswerBySubmission,
  fetchSubmissionByID,
} from "../../API/submissionsAPI.js";
import { toast } from "react-toastify";
import Questions from "../../Component/Exam/Questions.js";
import SaveModal from "../../Component/Modal/SaveModal.js";
import LoaderButton from "../../Component/Loader/LoaderButton.js";

function Quizz() {
  const { submissionID } = useParams();
  const navigate = useNavigate();
  const [questionsData, setQuestionsData] = useState([
    {
      questionId: "",
      questionText: "",
      scores: 2.5,
      examId: "",
      options: [
        {
          optionId: "",
          optionText: "",
          isCorrect: false,
        },
      ],
    },
  ]);
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
  const [submission, setSubmission] = useState({
    submission_id: "",
    exam_id: "",
    student_id: "",
    started_at: "",
    submitted_at: "",
    scores: 0,
  });
  const [answers, setAnswers] = useState({});
  const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  //Kiem tra dang nhap
  useEffect(() => {
    //Lấy dữ liệu các câu hỏi
    const handleGetQuestionsData = async (examID) => {
      try {
        const questionResults = await fetchQuestionNoCorrectAnswer(examID);
        if (questionResults !== null) {
          setQuestionsData(questionResults);
        }
        const examResult = await fetchExamByID(examID);
        if (examResult !== null) {
          setExam(examResult);
        }
      } catch (ex) {
        console.error(ex.message);
      } finally {
        setIsLoading(false);
      }
    };

    //Lấy dữ liệu bài làm
    const handleGetSubmissionByID = async (submissionID, userID) => {
      try {
        const result = await fetchSubmissionByID(submissionID, userID);
        if (result !== null) {
          if (!result.success) {
            toast.warning(result.message);
            window.history.back();
            return;
          }
          setSubmission(result.data);
          if (result.data.submitted_at !== null) {
            navigate(`/exam/result.data.exam_id`);
          }
          await handleGetQuestionsData(result.data.exam_id);
        }
      } catch (ex) {
        console.error(ex.message);
      }
    };
    //Kiem tra token
    const handleVerifyLogin = async () => {
      const result = await fetchVerifyLogin();
      if (result !== null) {
        const userID = result.userID;
        await handleGetSubmissionByID(submissionID, userID);
      }
    };
    handleVerifyLogin();
  }, [submissionID, navigate]);
  //Chọn câu trả lời
  const updateIsCorrect = (questionId, optionId) => {
    const questionIndex = questionsData.findIndex(
      (question) => question.questionId === questionId
    );
    const optionIndex = questionsData[questionIndex].options.findIndex(
      (option) => option.optionId === optionId
    );

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex, // Lưu chỉ số của option được chọn
    }));

    setQuestionsData((prevQuestions) =>
      prevQuestions.map((question) =>
        question.questionId === questionId
          ? {
              ...question,
              options: question.options.map((option) => ({
                ...option,
                isCorrect: option.optionId === optionId,
              })),
            }
          : question
      )
    );
  };

  //Nhấn câu trong phiếu trả lời
  const handleMoveToQuestion = (questionID) => {
    const element = document.getElementById(`${questionID}`);
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };
  const handleSubmitAnswers = async () => {
    setIsSaving(true)
    const result = await fetchInsertAnswerBySubmission(
      questionsData,
      submissionID
    );
    if (result !== null) {
      if (result.success) {
        toast.success(result.message);
        navigate(`/exam/${submission.exam_id}`);
      } else {
        toast.error(result.message);
        setIsSaving(false) 
      }
    }
  };
  //Kiểm tra tải lại trang
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (Object.keys(answers).length > 0) {
        event.preventDefault();
        const message =
          "Are you sure you want to leave? All provided data will be lost.";
        event.returnValue = message;
        return message; // Một số trình duyệt yêu cầu giá trị này để hiển thị cảnh báo
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [answers]);
  return (
    <div id="questionContainer">
      {isLoading ? (
        <div className="skeleton">
          <div className="skeleton-header text-center my-3"></div>
          <div className="d-flex gap-2 flex-column flex-lg-row align-items-center align-items-lg-start">
            <div className="col-lg-8 col-12">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="question card mb-4 p-3 shadow-sm">
                  <div className="skeleton-title mb-3"></div>
                  <div className="question-options d-flex flex-column gap-2">
                    {Array.from({ length: 4 }).map((_, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="skeleton-option d-flex align-items-center mb-2 p-3"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="answer-sheet col-lg-4 col-12 rounded mb-2">
              <div className="skeleton-title mb-3"></div>
              <div className="grid">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton-button d-flex justify-content-center gap-1 mb-2"
                  ></div>
                ))}
              </div>
              <button
                className="btn btn-primary disabled placeholder w-100"
                aria-disabled="true"
              ></button>
            </div>
          </div>
        </div>
      ) : (
        <div className="question-content">
          <h3 className="mt-4 mb-5 text-center">{exam.exam_name}</h3>
          <div
            className="text-primary d-block position-sticky bg-primary-subtle text-primary px-2 text-center mb-1"
            style={{ top: "0", zIndex: "1000" }}
          >
            {/* Bộ đếm thời gian */}
            <CountdownTimer
              exam_time={exam.exam_time}
              started_at={submission.started_at}
              submit={handleSubmitAnswers}
            />
          </div>
          <div className="d-flex gap-2 flex-column flex-lg-row align-items-center align-items-lg-start">
            <Questions
              questionsData={questionsData}
              onChange={updateIsCorrect}
            />
            <div className="answer-sheet col-lg-4 col-12 rounded mb-2">
              <h3 className="">Phiếu trả lời</h3>
              <div className="grid border-top border-primary border-2 py-1">
                {questionsData.map((question, index) =>
                  // Câu trả lời đã chọn hay chưa
                  answers[question.questionId] !== undefined ? (
                    <button
                      key={question.questionId}
                      className="btn d-flex justify-content-center gap-1 mb-2 button-selected"
                      onClick={() => handleMoveToQuestion(question.questionId)}
                    >
                      <span>{index + 1}:</span>{" "}
                      <span>{optionLabels[answers[question.questionId]]}</span>
                    </button>
                  ) : (
                    <button
                      key={question.questionId}
                      className="btn d-flex justify-content-center gap-1 mb-2  btn-outline-secondary"
                      onClick={() => handleMoveToQuestion(question.questionId)}
                    >
                      <span>{index + 1}:</span> <span></span>
                    </button>
                  )
                )}
              </div>
              <div>
                {isSaving ? (
                  <button
                    className="submit"
                    type="button"
                    disabled
                  >
                    <LoaderButton />
                  </button>
                ) : (
                  <button
                    className="submit"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#saveModal"
                  >
                    Nộp bài <FontAwesomeIcon icon={faSave} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <SaveModal
        content={"Bạn có chắc chắn muốn nộp bài?"}
        onSave={handleSubmitAnswers}
        title={"XÁC NHẬN NỘP BÀI THI"}
      />
    </div>
  );
}

export default Quizz;
