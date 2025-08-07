import "./AddQuestion.css";
import Select from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

function AddQuestion({ index, questionData, onChange, removeQuestion, mode }) {
  const [question, setQuestion] = useState(questionData);
  const [options, setOptions] = useState([
    { id: 0, name: "Correct answer: Option 1" },
    { id: 1, name: "Correct answer: Option 2" },
    { id: 2, name: "Correct answer: Option 3" },
    { id: 3, name: "Correct answer: Option 4" },
  ]);

  const handleQuestionTextChange = (e) => {
    setQuestion({ ...question, question_text: e.target.value });
  };

  const addOption = () => {
    const newOptions = [
      ...question.options,
      { option_text: "", is_correct: 0 },
    ];
    setQuestion({ ...question, options: newOptions });
  };

  const removeTag = (optionIndex) => {
    const newOptions = question.options.filter((_, i) => i !== optionIndex);
    setQuestion({ ...question, options: newOptions });
  };

  const handleOptionChange = (i, value) => {
    const newOptions = [...question.options];
    newOptions[i].option_text = value;
    setQuestion({ ...question, options: newOptions });
  };

  const handleCorrectAnswerChange = (e) => {
    const correctIndex = Number(e.target.value);
    const newOptions = question.options.map((opt, i) => ({
      ...opt,
      is_correct: i === correctIndex ? 1 : 0,
    }));
    setQuestion({ ...question, options: newOptions });
  };

  useEffect(() => {
    onChange(question);
  }, [question]);

  useEffect(() => {
    const newSelectOptions = question.options.map((_, index) => ({
      id: index,
      name: `Correct answer: Option ${index + 1}`,
    }));
    setOptions(newSelectOptions);
  }, [question.options.length]);

  return (
    <div className="add-question-card">
      {!mode && (
        <>
          <h5>Question {index + 1}</h5>
          <span onClick={() => removeQuestion(index)}>&times;</span>
        </>
      )}
      <TextInput
        id={`question-${index}`}
        label={"Question"}
        value={question?.question_text || ""}
        onChange={handleQuestionTextChange}
      />
      {question?.options?.map((opt, i) => (
        <TextInput
          key={i}
          id={`option${i}`}
          label={`Option ${i + 1}`}
          value={opt.option_text}
          onChange={(e) => handleOptionChange(i, e.target.value)}
          {...(i > 3 ? { onClick: () => removeTag(i) } : undefined)}
        />
      ))}
      <Select
        text="Correct Answer"
        value={
          question?.options?.some((opt) => opt.is_correct === 1)
            ? question.options.findIndex((opt) => opt.is_correct === 1)
            : ""
        }
        onChange={handleCorrectAnswerChange}
        options={options}
      />
      <Button type="button" className="border" onClick={addOption}>
        + Add Option
      </Button>
      {mode === "edit" ? (
        <div className="update-btn">
          <Button type={"submit"} className={"primary"}>
            Save changes
          </Button>
        </div>
      ) : mode === "add" ? (
        <div className="update-btn">
          <Button type={"submit"} className={"primary"}>
            Submit Question
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddQuestion;
