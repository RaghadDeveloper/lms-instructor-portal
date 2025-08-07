import "./EditQuestion.css";
import AddQuestion from "../../components/AddQuestion/AddQuestion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, updateQuestion } from "../../features/quiz/quizThunk";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

function EditQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { quizId } = useParams();
  const [question, setQuestion] = useState(
    () =>
      location.state?.question ?? {
        question_text: "",
        options: [
          { option_text: "", is_correct: 0 },
          { option_text: "", is_correct: 0 },
          { option_text: "", is_correct: 0 },
          { option_text: "", is_correct: 0 },
        ],
      }
  );
  const { questionId } = useParams();
  const { loading, error } = useSelector((state) => state.quiz);
  const mode = location?.state?.question ? "edit" : "add";

  const handleQuestionChange = (updatedQuestion) => {
    setQuestion(updatedQuestion);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resultAction;
    if (mode === "edit") {
      resultAction = await dispatch(updateQuestion({ questionId, question }));
    } else if (mode === "add") {
      console.log({ quiz_id: quizId, question });
      resultAction = await dispatch(
        addQuestion({ ...question, quiz_id: quizId })
      );
    }
    if (
      updateQuestion.fulfilled.match(resultAction) ||
      addQuestion.fulfilled.match(resultAction)
    )
      navigate(-1);
  };

  if (!question) return <p>Question data not available.</p>;
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <form className="edit-question" onSubmit={handleSubmit}>
      <h2>
        {location?.state?.question
          ? "Edit Quiz Question"
          : "Create Quiz Question"}
      </h2>
      <AddQuestion
        index={0}
        questionData={question}
        onChange={handleQuestionChange}
        mode={mode}
      />
    </form>
  );
}

export default EditQuestion;
