import "./Chat.css";
import img from "./../../assets/images/profileImg.jpg";
import { LuSend } from "react-icons/lu";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

function Chat() {
  const { loading, user, chat } = useSelector((state) => state.chats);
  const { profile } = useSelector((state) => state.profile);

  return (
    <div className="chat">
      {loading ? (
        <Loader />
      ) : !chat ? (
        <p className="no-chat">Select a chat to start messaging</p>
      ) : (
        <>
          <header className="chat-header">
            <img src={user?.avatar_url || img} className="user-img" />
            <p className="user-name">{user?.username}</p>
          </header>

          <div className="msgs">
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className={`${
                  profile.user_id === message.sender_id ? "msg1" : "msg2"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>

          <div className="message-input">
            <textarea placeholder="Write your message..." />
            <button className="send-icon">
              <LuSend />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
