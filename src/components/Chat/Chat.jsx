import "./Chat.css";
import img from "./../../assets/images/profileImg.jpg";
import { LuSend } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendMessage } from "../../features/chats/chatsThunk";

function Chat() {
  const dispatch = useDispatch();
  const { loading, user, chat } = useSelector((state) => state.chats);
  const { profile } = useSelector((state) => state.profile);
  const { userId } = useParams();
  const [message, setMessage] = useState(() => ({
    receiver_id: "",
    content: "",
  }));

  useEffect(() => {
    if (userId) {
      setMessage((prev) => ({
        ...prev,
        receiver_id: userId,
      }));
    }
  }, [userId]);

  const handleSubmit = async () => {
    await dispatch(sendMessage(message));
  };

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
            <textarea
              placeholder="Write your message..."
              value={message.content}
              onChange={(e) =>
                setMessage({ ...message, content: e.target.value })
              }
            />
            <button className="send-icon" onClick={handleSubmit}>
              <LuSend />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
