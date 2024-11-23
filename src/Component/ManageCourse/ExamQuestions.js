import React, { useState, useEffect } from "react";
import "../../CssFolder/Exam.css";
import { useParams } from "react-router-dom";
import {
  fetchQuestionsByExam,
  fetchUpsertQuestionsAndOptions,
} from "../../API/questionAPI";
import PaginationsComponent from "../PaginationsComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faPencil,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import LoaderButton from "../Loader/LoaderButton";
function ExamQuestions({ examData }) {
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

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [questionsPerPage] = useState(5); // Số câu mỗi trang
  const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [editing, setEditing] = useState("");
  const [reload, setReload] = useState(false);
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
    handleGetData();
  }, [examID, reload]);
  //Tính điểm cho các câu hỏi
  useEffect(() => {
    // Function to divide totalScore among all questions
    const distributeScoresEvenly = () => {
      if (questionsData.length === 0) {
        alert("Không có câu hỏi nào để phân phối điểm.");
        return;
      }

      const averageScore = examData.total_score / questionsData.length;
      const oldQuestionScore = questionsData[0].scores;
      if (averageScore !== oldQuestionScore) {
        setQuestionsData((prevQuestions) =>
          prevQuestions.map((question) => ({
            ...question,
            scores: averageScore,
          }))
        );
      }
    };
    distributeScoresEvenly();
  }, [questionsData, examData]);

  // Lấy dữ liệu của trang hiện tại
  const indexOfLastQuestion = currentPage * questionsPerPage; // Index của câu cuối trong trang
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage; // Index của câu đầu trong trang
  const currentQuestions = questionsData.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  ); // Lấy danh sách câu hỏi cho trang hiện tại

  // Cập nhật trạng thái khi thay đổi trang
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll page
    const element = document.getElementById("questionContainer");
    element.scrollIntoView({ behavior: "smooth" });
  };
  //Cập nhật câu hỏi đúng
  const updateIsCorrect = (questionId, optionId) => {
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
  //Cập nhật dữ liệu câu hỏi
  const handleQuestionTextChange = (questionId, newText) => {
    setQuestionsData((prevQuestions) =>
      prevQuestions.map((question) =>
        question.questionId === questionId
          ? { ...question, questionText: newText }
          : question
      )
    );
  };
  //Cập nhật dữ liệu các tùy chọn
  const handleOptionChange = (questionId, optionId, newValue) => {
    setQuestionsData((prevQuestions) =>
      prevQuestions.map((question) =>
        question.questionId === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.optionId === optionId
                  ? { ...option, optionText: newValue }
                  : option
              ),
            }
          : question
      )
    );
  };
  //Thêm câu hỏi mới
  const handleAddQuestion = () => {
    const newQuestion = {
      questionId: uuidv4(), // Tạo ID tạm thời
      questionText: "Câu hỏi mới",
      scores: 1.0,
      examId: examID,
      options: [
        { optionId: uuidv4(), optionText: "Lựa chọn A", isCorrect: true },
        { optionId: uuidv4(), optionText: "Lựa chọn B", isCorrect: false },
        { optionId: uuidv4(), optionText: "Lựa chọn C", isCorrect: false },
        { optionId: uuidv4(), optionText: "Lựa chọn D", isCorrect: false },
      ],
    };

    setQuestionsData((prevQuestions) => [newQuestion, ...prevQuestions]);
    setEditing(newQuestion.questionId); // Đặt câu hỏi vừa thêm vào chế độ chỉnh sửa
  };
  //Xóa câu hỏi
  const handleDeleteQuestion = (questionID) => {
    const filteredQuestions = questionsData.filter(
      (question) => question.questionId !== questionID
    );
    setQuestionsData(filteredQuestions);
  };

  //Upsert dữ liệu
  const handleUpsertQuestions = async () => {
    setIsLoading(true);
    try {
      const result = await fetchUpsertQuestionsAndOptions(questionsData);
      if (result !== null && result.success === true) {
        toast.success(result.message);
      } else {
        toast.error("Gặp lỗi khi cập nhật dữ liệu");
      }
    } catch (ex) {
      console.log(ex.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div id="questionContainer">
      <hr />
      <h3 className="my-4 text-center">Các Câu Hỏi Trong Bài Kiểm Tra</h3>
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-success" onClick={handleAddQuestion}>
          Thêm Câu hỏi <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {currentQuestions.map((question) => (
        <div
          key={question.questionId}
          className="question card mb-4 p-3 shadow-sm"
        >
          <div className="d-flex flex-column-reverse flex-lg-row flex-md-row justify-content-between mb-3">
            <div className="position-relative d-inline-flex w-100">
                {/* Mở input để nhập */}
              {editing === question.questionId ? (
                <textarea
                  className="form-control w-100"
                  rows={3}
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionTextChange(
                      question.questionId,
                      e.target.value
                    )
                  }
                ></textarea>
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: question.questionText.replace(/\n/g, "<br>"),
                  }}
                  className="mb-0"
                ></p>
              )}
            </div>
            <div>
                {/* Mở chế độ edit */}
              {editing === question.questionId ? (
                <button
                  className="btn btn-success fs-6 ms-2"
                  onClick={() => setEditing(null)}
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
              ) : (
                <div className="btn-group">
                  <button
                    className="btn fs-6 ms-2"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <FontAwesomeIcon icon={faGear} />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item btn text-success"
                        onClick={() => setEditing(question.questionId)}
                      >
                        Chỉnh sửa <FontAwesomeIcon icon={faPencil} />
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item btn text-danger"
                        onClick={() =>
                          handleDeleteQuestion(question.questionId)
                        }
                      >
                        Xóa <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="question-options row gap-1 justify-content-evenly">
            {question.options.map((option, optionIndex) =>
              editing === question.questionId ? (
                <textarea
                  key={option.optionId}
                  className="form-control d-flex align-items-center mb-2 col-md-5 col-sm-12"
                  value={option.optionText}
                  onChange={(e) =>
                    handleOptionChange(
                      question.questionId,
                      option.optionId,
                      e.target.value
                    )
                  }
                ></textarea>
              ) : (
                <label
                  key={option.optionId}
                  className={`d-flex align-items-center mb-2 col-md-5 col-sm-12 ${
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
              )
            )}
          </div>
        </div>
      ))}

      {/* Phân trang */}
      <PaginationsComponent
        currentPage={currentPage}
        totalPage={Math.ceil(questionsData.length / questionsPerPage)}
        changePage={paginate}
      />

      <div className="d-flex justify-content-center gap-1">
        <button
          className="btn btn-secondary"
          onClick={() => setReload(!reload)}
        >
          Đặt lại
        </button>
        {isLoading ? (
          <button
            className="btn btn-success"
            type="button"
          >
            <LoaderButton />
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => handleUpsertQuestions()}
          >
            Lưu thay đổi
          </button>
        )}
      </div>
    </div>
  );
}

export default ExamQuestions;
