import { CiEdit } from "react-icons/ci";
import "./QuizQuestionCard.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../features/quiz/quizThunk";
import { useNavigate, useParams } from "react-router-dom";

function QuizQuestionCard({ num, question }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const correctOptionNumber =
    question.options.findIndex((group) => group.color === "green") + 1;

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
          <button
            onClick={() =>
              navigate(
                `/courses/${courseId}/quiz/edit-question/${question.question_id}`,
                { state: { question } }
              )
            }
          >
            <CiEdit />
          </button>
          <button onClick={handleDelete}>
            <AiOutlineDelete />
          </button>
        </div>
      </div>
      <ul className="options">
        {question.options.map((option, index) => (
          <li key={index} className="answer">
            {option.option_text}
          </li>
        ))}
      </ul>
      <p>Correct answer: {correctOptionNumber}</p>
    </div>
  );
}

export default QuizQuestionCard;
