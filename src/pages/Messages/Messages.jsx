import ChatsList from "../../components/ChatsList/ChatsList";
import "./Messages.css";

function Messages() {
  return (
    <div className="messages-page">
      <div>Messages</div>
      <ChatsList />
    </div>
  );
}

export default Messages;
