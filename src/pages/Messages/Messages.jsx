import "./Messages.css";
import ChatsList from "../../components/ChatsList/ChatsList";
import Chat from "../../components/Chat/Chat";

function Messages() {
  return (
    <div className="messages-page">
      <Chat />
      <ChatsList />
    </div>
  );
}

export default Messages;
