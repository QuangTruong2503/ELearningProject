import React from "react";
import mammoth from "mammoth";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

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
interface AddQuestionsByWordProps {
    onQuestionsUpdate: (questions: Question[]) => void;
  }
const AddQuestionsByWord: React.FC<AddQuestionsByWordProps> = ({onQuestionsUpdate}) => {
  const { examID } = useParams<{ examID: string }>();

  // Hàm xử lý đọc file Word
  const handleFileRead = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();

      // Sử dụng mammoth để chuyển Word sang plain text
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value; // Lấy nội dung thô
      const jsonOutput = parseTextToJson(text, examID || "", 1); // Set scores mặc định là 1
      onQuestionsUpdate(jsonOutput)
    }
  };

  // Hàm chuyển văn bản sang JSON và loại bỏ câu hỏi rỗng
  const parseTextToJson = (text: string, examID: string, scores: number): Question[] => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const questions: Question[] = [];
    let currentQuestion: Question | null = null;

    lines.forEach((line) => {
      if (line.startsWith("Câu")) {
        // Push câu hỏi trước đó nếu tồn tại
        if (currentQuestion) {
          questions.push(currentQuestion);
        }

        // Khởi tạo câu hỏi mới
        const questionText = line.split(/[:.]/).slice(1).join(":").trim();
        currentQuestion = {
          questionId: uuidv4(),
          questionText: questionText,
          scores: scores,
          examId: examID,
          options: [],
        };
      } else if (
        line.startsWith("A.") ||
        line.startsWith("B.") ||
        line.startsWith("C.") ||
        line.startsWith("D.")
      ) {
        // Thêm lựa chọn vào câu hỏi hiện tại
        if (currentQuestion) {
          const optionText = line.split(".").slice(1).join(".").trim();
          currentQuestion.options.push({
            optionId: uuidv4(),
            optionText: optionText,
            isCorrect: false,
          });
        }
      } else if (line.startsWith("Đáp án:")) {
        // Gán đáp án đúng
        if (currentQuestion) {
          const correctAnswer = line.split(":").pop()?.trim();
          currentQuestion.options = currentQuestion.options.map((option, index) => ({
            ...option,
            isCorrect: ["A", "B", "C", "D"][index] === correctAnswer,
          }));
        }
      }
    });

    // Thêm câu hỏi cuối cùng nếu tồn tại
    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return questions;
  };

  return (
    <div>
      <label className="btn d-flex gap-1 align-items-center" htmlFor="uploadQuestions">
        <FontAwesomeIcon icon={faUpload}/>
        <span>Tải lên file word</span>
      </label>
      <input
        className="d-none"
        id="uploadQuestions"
        type="file"
        accept=".docx"
        onChange={handleFileRead}
      />
    </div>
  );
};

export default AddQuestionsByWord;
