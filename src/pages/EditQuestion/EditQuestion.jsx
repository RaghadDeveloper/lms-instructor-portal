import "./EditQuestion.css";
import AddQuestion from "../../components/AddQuestion/AddQuestion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../../features/quiz/quizThunk";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

function EditQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [question, setQuestion] = useState(
    () => location.state?.question ?? null
  );
  const { questionId } = useParams();
  const { loading, error } = useSelector((state) => state.quiz);

  const handleQuestionChange = (updatedQuestion) => {
    setQuestion(updatedQuestion);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      updateQuestion({ questionId, question })
    );
    if (updateQuestion.fulfilled.match(resultAction)) navigate(-1);
  };

  if (!question) return <p>Question data not available.</p>;
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <form className="edit-question" onSubmit={handleSubmit}>
      <h2>Edit Quiz Question</h2>
      <AddQuestion
        index={0}
        questionData={question}
        onChange={handleQuestionChange}
        mode="edit"
      />
    </form>
  );
}

export default EditQuestion;
