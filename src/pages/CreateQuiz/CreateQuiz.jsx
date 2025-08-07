import { useDispatch, useSelector } from "react-redux";
import AddQuestion from "../../components/AddQuestion/AddQuestion";
import "./CreateQuiz.css";
import { useState } from "react";
import { createQuiz } from "../../features/quiz/quizThunk";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

function CreateQuiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, quiz } = useSelector((state) => state.quiz);
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([
    {
      question_text: "",
      options: [
        { option_text: "", is_correct: 0 },
        { option_text: "", is_correct: 0 },
        { option_text: "", is_correct: 0 },
        { option_text: "", is_correct: 0 },
      ],
    },
  ]);

  const handleAddQuestion = () => {
    const newQuestion = {
      question_text: "",
      options: [
        { option_text: "", is_correct: 0 },
        { option_text: "", is_correct: 0 },
        { option_text: "", is_correct: 0 },
        { option_text: "", is_correct: 0 },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    const quizInfo = {
      course_id: Number(courseId),
      questions: questions,
    };

    const resultAction = await dispatch(createQuiz(quizInfo));
    if (createQuiz.fulfilled.match(resultAction))
      navigate(`/courses/${courseId}/quiz/${quiz.quiz_id}`);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <form className="create-quiz" onSubmit={handleSubmit}>
      <h1>Create Quiz</h1>
      <div className="add-questions">
        {questions.map((question, index) => (
          <AddQuestion
            key={index}
            index={index}
            questionData={question}
            onChange={(updatedQuestion) =>
              handleQuestionChange(index, updatedQuestion)
            }
            removeQuestion={handleRemoveQuestion}
          />
        ))}
        <Button
          type={"button"}
          className={"border"}
          onClick={handleAddQuestion}
        >
          &#43; Add Question
        </Button>
      </div>
      <div className="btn-container">
        <Button type={"submit"} className={"primary"}>
          Submit Quiz
        </Button>
      </div>
    </form>
  );
}

export default CreateQuiz;
