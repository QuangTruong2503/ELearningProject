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
  faFileWord,
  faGear,
  faPencil,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import LoaderButton from "../Loader/LoaderButton";
import AddQuestionsByWord from "../Exam/AddQuestionsByWord.tsx";
import { downloadFromGoogleDrive } from "../../Helpers/downloadDriveFile";

// Định nghĩa kiểu dữ liệu
interface Option {
  optionId: string;
  optionText: string;
  isCorrect: boolean;
}

interface Question {
  questionId: string;
  questionText: string;
  scores: number;
  examId: string;
  options: Option[];
}

interface ExamData {
  total_score: number;
}

interface ExamQuestionsProps {
  examData: ExamData;
}

const ExamQuestions: React.FC<ExamQuestionsProps> = ({ examData }) => {
  const { examID } = useParams<{ examID: string }>();
  const [questionsData, setQuestionsData] = useState<Question[]>([
  ]);

  const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
  const [questionsPerPage] = useState<number>(5); // Số câu mỗi trang
  const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [editing, setEditing] = useState<string | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Lấy dữ liệu các câu hỏi
  useEffect(() => {
    const handleGetData = async () => {
      if (!examID) return;
      const questionResults = await fetchQuestionsByExam(
        `Questions/by-examID?id=${examID}`
      );
      if (questionResults !== null) {
        setQuestionsData(questionResults);
      }
    };
    handleGetData();
  }, [examID, reload]);

  // Tính điểm cho các câu hỏi
  useEffect(() => {
    const distributeScoresEvenly = () => {
      if (questionsData.length === 0) {
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
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questionsData.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById("questionContainer");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const updateIsCorrect = (questionId: string, optionId: string) => {
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

  const handleQuestionTextChange = (questionId: string, newText: string) => {
    setQuestionsData((prevQuestions) =>
      prevQuestions.map((question) =>
        question.questionId === questionId
          ? { ...question, questionText: newText }
          : question
      )
    );
  };

  const handleOptionChange = (
    questionId: string,
    optionId: string,
    newValue: string
  ) => {
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

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      questionId: uuidv4(),
      questionText: "Câu hỏi mới",
      scores: 1.0,
      examId: examID || "",
      options: [
        { optionId: uuidv4(), optionText: "Lựa chọn", isCorrect: true },
        { optionId: uuidv4(), optionText: "Lựa chọn", isCorrect: false },
        { optionId: uuidv4(), optionText: "Lựa chọn", isCorrect: false },
        { optionId: uuidv4(), optionText: "Lựa chọn", isCorrect: false },
      ],
    };

    setQuestionsData((prevQuestions) => [newQuestion, ...prevQuestions]);
    setEditing(newQuestion.questionId);
  };

  const handleDeleteQuestion = (questionID: string) => {
    const filteredQuestions = questionsData.filter(
      (question) => question.questionId !== questionID
    );
    setQuestionsData(filteredQuestions);
  };

  const handleUpsertQuestions = async () => {
    setIsLoading(true);
    try {
      const result = await fetchUpsertQuestionsAndOptions(questionsData);
      if (result !== null && result.success === true) {
        toast.success(result.message);
      } else {
        toast.error("Gặp lỗi khi cập nhật dữ liệu");
      }
    } catch (ex: any) {
      console.log(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestionByWord = (updatedQuestions: Question[]) => {
    setQuestionsData((prev) => [...updatedQuestions, ...prev]);
  };

  return (
    <div id="questionContainer">
      <hr />
      <h3 className="my-4 text-center">Các Câu Hỏi Trong Bài Kiểm Tra</h3>
      <div className="d-flex justify-content-end mb-2 dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Tùy chọn
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="btn text-success" onClick={handleAddQuestion}>
              <FontAwesomeIcon icon={faPlus} /> Thêm câu hỏi
            </button>
          </li>
          <li>
            <button
              className="btn"
              onClick={() =>
                downloadFromGoogleDrive(
                  "13V_NtA-64Q2kzlhXQWiESFW0OP8ezkF5",
                  "File_cau_hoi_mau"
                )
              }
            >
              <FontAwesomeIcon icon={faFileWord} /> Tải file mẫu
            </button>
          </li>
          <li>
            <AddQuestionsByWord onQuestionsUpdate={handleAddQuestionByWord} />
          </li>
        </ul>
      </div>
      {currentQuestions.map((question) => (
        <div
          key={question.questionId}
          className="question card mb-4 p-3 shadow-sm"
        >
          <div className="d-flex flex-column-reverse flex-lg-row flex-md-row justify-content-between mb-3">
            <div className="position-relative d-inline-flex w-100">
              {editing === question.questionId ? (
                <textarea
                  className="form-control w-100"
                  rows={3}
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionTextChange(question.questionId, e.target.value)
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
                        onClick={() => handleDeleteQuestion(question.questionId)}
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
          <button className="btn btn-success" type="button">
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
};

export default ExamQuestions;
