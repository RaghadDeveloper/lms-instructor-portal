import { CiEdit } from "react-icons/ci";
import "./QuizQuestionCard.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../features/quiz/quizThunk";

function QuizQuestionCard({ num, question }) {
  const dispatch = useDispatch();
  const correctOptionNumber =
    question.options.findIndex((group) => group[0].color === "green") + 1;

  const handleDelete = () => {
    dispatch(deleteQuestion(question.question_id));
  };

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
          <button onClick={handleDelete}>
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
