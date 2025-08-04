import { CiEdit } from "react-icons/ci";
import "./QuizQuestionCard.css";
import { AiOutlineDelete } from "react-icons/ai";

function QuizQuestionCard({ num, question }) {
  const correctOptionNumber =
    question.options.findIndex((group) => group[0].color === "green") + 1;

  return (
    <div className="question-card">
      <div className="header">
        <p className="question">
          <span>{num <= 9 ? `0${num}` : num}.</span>
          {question.question_text}
        </p>
        <div className="actions">
          <button>
            <CiEdit />
          </button>
          <button>
            <AiOutlineDelete />
          </button>
        </div>
      </div>
      <ul className="options">
        {question.options.map((option) => (
          <li key={option.at(0).id} className="answer">
            {option.at(0).option_text}
          </li>
        ))}
      </ul>
      <p>Correct answer: {correctOptionNumber}</p>
    </div>
  );
}

export default QuizQuestionCard;
