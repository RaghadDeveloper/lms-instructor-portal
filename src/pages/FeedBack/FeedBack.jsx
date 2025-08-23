import { useState } from "react";
import Select from "../../components/Select/Select";
import "./FeedBack.css";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { sendFeedback } from "../../features/feedback/feedbackThunk";

function FeedBack() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    message_type: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(sendFeedback(message));
    if (sendFeedback.fulfilled.match(result)) {
      setMessage({ message_type: "", content: "" });
      alert("The message was sent successfully.");
    } else {
      alert("Failed to send message");
    }
  };

  return (
    <div className="feedback">
      <h1>Feedback to Admin</h1>
      <p>
        Share your suggestions or report any issues. This will help us improve.
      </p>
      <form onSubmit={handleSubmit}>
        <Select
          text={"Message type"}
          value={message.message_type}
          options={[
            { id: "suggestion", name: "Suggestion" },
            { id: "complaint", name: "Complaint" },
          ]}
          onChange={(e) =>
            setMessage({ ...message, message_type: e.target.value })
          }
        />
        <TextArea
          value={message.content}
          placeholder={"Write feedback message"}
          onChange={(e) => setMessage({ ...message, content: e.target.value })}
          minLength={10}
        />
        <Button type={"submit"} className={"primary"}>
          Submit FeedBack
        </Button>
      </form>
    </div>
  );
}

export default FeedBack;
