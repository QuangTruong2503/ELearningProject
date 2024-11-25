import React, { useState, useEffect } from "react";
import "../../CssFolder/Exam.css";
import { useParams } from "react-router-dom";
import { fetchQuestionsByExam } from "../../API/questionAPI";

import { toast } from "react-toastify";
import LoaderButton from "../../Component/Loader/LoaderButton.js";
import { fetchExamByID } from "../../API/examsAPI.js";
function Quizz() {
  const { examID } = useParams();
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
  const [answers, setAnswers] = useState({});
  const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [isLoading, setIsLoading] = useState(false);

  //Lấy dữ liệu các câu hỏi
  useEffect(() => {
    const handleGetData = async () => {
      const questionResults = await fetchQuestionsByExam(
        `Questions/by-examID?id=${examID}`
      );
      if (questionResults !== null) {
        setQuestionsData(questionResults);
      }
    };
    const hanldeGetExam = async () => {
      const result = await fetchExamByID(examID);
      if (result !== null) {
        setExam(result);
      }
    };
    hanldeGetExam();
    handleGetData();
  }, [examID]);
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
    element.scrollIntoView({ behavior: "smooth" });
  };

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
      <h3 className="mt-4 mb-5 text-center">{exam.exam_name}</h3>
      <div className="d-flex gap-2">
        <div className="col-md-8">
          {questionsData.map((question, index) => (
            <div
              key={question.questionId}
              className="question card mb-4 p-3 shadow-sm"
              id={question.questionId}
            >
              <div className="d-flex flex-column-reverse flex-lg-row flex-md-row justify-content-between mb-3">
                <div className="position-relative w-100">
                  <h5 className="text-primary">Câu {index + 1}</h5>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: question.questionText.replace(/\n/g, "<br>"),
                    }}
                    className="mb-0"
                  ></p>
                </div>
              </div>
              <div className="question-options d-flex flex-column gap-1 justify-content-evenly">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={option.optionId}
                    className={`d-flex align-items-center mb-2 p-3 ${
                      option.isCorrect
                        ? "question-option--checked"
                        : "question-option"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={`question-${question.questionId}`}
                      value={option.optionId}
                      checked={option.isCorrect}
                      onChange={() =>
                        updateIsCorrect(question.questionId, option.optionId)
                      }
                      className="me-2 form-check-input d-none"
                    />

                    <span>
                      <strong>{optionLabels[optionIndex]}</strong>.{" "}
                      {option.optionText}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="answer-sheet col-md-4">
          <h3>Phiếu trả lời</h3>
          <div className="grid">
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
                  className="btn d-flex justify-content-center gap-1 mb-2"
                  onClick={() => handleMoveToQuestion(question.questionId)}
                >
                  <span>{index + 1}:</span> <span></span>
                </button>
              )
            )}
          </div>
          <button className="submit">Nộp bài</button>
        </div>
      </div>
    </div>
  );
}

export default Quizz;
