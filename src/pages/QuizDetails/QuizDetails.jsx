import { useDispatch, useSelector } from "react-redux";
import QuizQuestionCard from "../../components/QuizQuestionCard/QuizQuestionCard";
import "./QuizDetails.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getQuiz } from "../../features/quiz/quizThunk";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function QuizDetails() {
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const { loading, error, quiz } = useSelector((state) => state.quiz);
  const { course } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getQuiz(quizId));
  }, [dispatch, quizId]);
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div className="quiz-details">
      {course && <h1 className="title">{course.title} Quiz</h1>}
      {quiz?.questions?.map((question, index) => (
        <QuizQuestionCard key={index} num={index + 1} question={question} />
      ))}
    </div>
  );
}

export default QuizDetails;
