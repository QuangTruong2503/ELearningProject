import React from "react";

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

interface QuestionsAndAnswerProps {
  data: {
    questionsData: Question[];
  } | undefined;
}

const QuestionsAndAnswer: React.FC<QuestionsAndAnswerProps> = ({ data }) => {
  const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <div className="col-12 col-md-8">
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
                    option.option_id ===
                      question.answersData.selected_option_id
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
