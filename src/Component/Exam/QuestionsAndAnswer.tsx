import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

// Define the types for props and data structure
interface Option {
  option_id: string;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  question_id: string;
  question_text: string;
  scores: number;
  options: Option[];
  answersData: {
    answer_id: string;
    selected_option_id: string;
  };
}
interface User{
  first_name: string;
  last_name: string;
}

interface Submission{
  started_at: Date;
  submitted_at: Date;
  scores: number;
}

interface QuestionsAndAnswerProps {
  data:
    | {
        questionsData: Question[];
        exam: Exam;
        user: User;
        submission: Submission;
      }
    | undefined;
}
interface Exam {
  exam_id: string;
  exam_name: string;
  total_score: number;
}
const QuestionsAndAnswer: React.FC<QuestionsAndAnswerProps> = ({ data }) => {
  const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
  // Hàm tính thời gian làm xong bài
  const handleCalcTime = (start, submit) =>{
    const startTime = new Date(start).getTime()
    const submitTime = new Date(submit).getTime()
    const time = Math.max(Math.floor((submitTime - startTime) / 1000), 0)
    const minutes = Math.floor(time / 60)
    const secs = time % 60
    return `${String(minutes).padStart(2, "0")} phút ${String(secs).padStart(2, "0")} giây`
  }
  return (
    <div className="col-12 col-md-8">
      {data !== undefined && (
        <div>
          <div className="d-flex justify-content-start">
            <NavLink to={`/exam/${data.exam.exam_id}`}
              className=" text-primary"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Quay lại
            </NavLink>
          </div>
          <h3 className="text-center mb-5">{data.exam.exam_name}</h3>
          {/* Thong tin */}
          <div className="mb-3 d-flex flex-column gap-2">
            <div className="d-flex gap-2">
              <strong>Tên người làm:</strong>
              <span>{data.user.first_name} {data.user.last_name}</span>
            </div>
            <div className="d-flex gap-2">
              <strong>Điểm số:</strong>
              <span>{data.submission.scores}/{data.exam.total_score}</span>
            </div>
            <div className="d-flex gap-2">
              <strong>Thời gian làm bài:</strong>
              <span>{handleCalcTime(data.submission.started_at, data.submission.submitted_at)}</span>
            </div>
          </div>
        </div>
      )}
      {data === undefined && (
        <div className="skeleton">
          <div>
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
        </div>
      )}
      {data !== undefined &&
        data.questionsData.map((question, index) => (
          <div
            key={question.question_id}
            className="question card mb-4 p-3 shadow-sm"
            id={question.question_id}
          >
            <div className="d-flex flex-column-reverse flex-lg-row flex-md-row justify-content-between mb-3">
              <div className="position-relative w-100">
                <h5 className="text-primary">Câu {index + 1}</h5>
                <p
                  dangerouslySetInnerHTML={{
                    __html: question.question_text.replace(/\n/g, "<br>"),
                  }}
                  className="mb-0"
                ></p>
              </div>
              {/* Display Correct/Incorrect Badge */}
              <div className="h-auto">
                {question.options.find((option) => option.is_correct)
                  ?.option_id === question.answersData.selected_option_id ? (
                  <div className="badge text-bg-success">Đúng</div>
                ) : (
                  <div className="badge text-bg-danger">Sai</div>
                )}
              </div>
            </div>
            <div className="question-options d-flex flex-column gap-1 justify-content-evenly">
              {question.options.map((option, optionIndex) => (
                <label
                  key={option.option_id}
                  className={`d-flex align-items-center mb-2 p-3 ${
                    option.is_correct
                      ? "question-option--isCorrect"
                      : "question-option"
                  } ${
                    !option.is_correct &&
                    option.option_id === question.answersData.selected_option_id
                      ? "question-option--isWrong"
                      : "question-option"
                  }`}
                >
                  <input
                    readOnly
                    type="checkbox"
                    name={`question-${question.question_id}`}
                    value={option.option_text}
                    checked={option.is_correct}
                    className="me-2 form-check-input d-none"
                  />

                  <span>
                    <strong>{optionLabels[optionIndex]}</strong>.{" "}
                    {option.option_text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuestionsAndAnswer;
