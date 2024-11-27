import React from 'react'

function Questions({questionsData, onChange, isEdit = true}) {
  const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
  
  return (
    <div className="col-lg-8 col-12">
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
                disabled ={!isEdit}
                type="checkbox"
                name={`question-${question.questionId}`}
                value={option.optionId}
                checked={option.isCorrect}
                onChange={() =>
                  onChange(
                    question.questionId,
                    option.optionId
                  )
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
  )
}

export default Questions