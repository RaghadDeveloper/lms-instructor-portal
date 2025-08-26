import "./Chat.css";
import img from "./../../assets/images/profileImg.jpg";
import { LuSend } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateMessage, sendMessage } from "../../features/chats/chatsThunk";
import Message from "../Message/Message";

function Chat() {
  const dispatch = useDispatch();
  const { loading, user, chat } = useSelector((state) => state.chats);
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
        content: "",
      }));
    }
  }, [userId]);

  const handleSubmit = async () => {
    if (message.id) {
      const result = await dispatch(updateMessage(message));
      if (updateMessage.fulfilled.match(result))
        setMessage({
          receiver_id: userId,
          content: "",
        });
    } else {
      const result = await dispatch(sendMessage(message));
      if (sendMessage.fulfilled.match(result))
        setMessage({
          receiver_id: userId,
          content: "",
        });
    }
  };

  return (
    <div className="chat">
      {loading ? (
        <p className="loading">Loading chat...</p>
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
              <Message
                key={message.id}
                message={message}
                setMessage={setMessage}
              />
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
