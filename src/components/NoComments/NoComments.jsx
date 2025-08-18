import "./NoComments.css";
import { FaComments } from "react-icons/fa";

function NoComments() {
  return (
    <div className="no-comments">
      <FaComments className="icon" />
      <p>No Comments yet</p>
      <p>Be the first to comment.</p>
    </div>
  );
}

export default NoComments;
