import "./ChatsList.css";
import UserItem from "../UserItem/UserItem";

function ChatsList() {
  return (
    <div className="chats-list">
      <h2>All Chats</h2>
      <ul>
        <UserItem />
        <UserItem />
        <UserItem />
      </ul>
    </div>
  );
}

export default ChatsList;
