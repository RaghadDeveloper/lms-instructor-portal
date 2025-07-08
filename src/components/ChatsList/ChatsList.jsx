import "./ChatsList.css";
import ChatCard from "../ChatCard/ChatCard";

function ChatsList() {
  return (
    <div className="chats-list">
      <h2>All Chats</h2>
      <ul>
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </ul>
    </div>
  );
}

export default ChatsList;
