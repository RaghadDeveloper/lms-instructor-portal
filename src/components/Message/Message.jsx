import { useDispatch, useSelector } from "react-redux";
import "./Message.css";
import { CiEdit, CiTrash } from "react-icons/ci";
import { deleteMessage } from "../../features/chats/chatsThunk";
import { useState } from "react";
import Button from "../Button/Button";

function Message({ message, setMessage }) {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [loaing, setLoading] = useState(false);
  const { profile } = useSelector((state) => state.profile);
  const isSender = profile.user_id === message.sender_id;

  const handleDeleteMessage = async () => {
    setLoading(true);
    await dispatch(deleteMessage(message.id));
    setLoading(false);
  };

  return (
    <>
      <div className="msg">
        <div className={`${isSender ? "msg1" : "msg2"}`}>
          <pre>{message.content}</pre>
          {isSender && (
            <div className="msg-actions">
              <button
                className="msg-edit-btn"
                onClick={() =>
                  setMessage({ ...message, content: message.content })
                }
              >
                <CiEdit />
              </button>
              <button
                className="msg-del-btn"
                onClick={() => setShowDelete(true)}
              >
                <CiTrash />
              </button>
            </div>
          )}
        </div>
      </div>
      {showDelete && (
        <>
          <div className="modal-overlay" onClick={() => setShowDelete(false)} />
          <div className="delete-modal">
            <p>Are you sure you want to delete this Message?</p>
            <Button
              className={"danger"}
              onClick={handleDeleteMessage}
              disabled={loaing}
            >
              Yes
            </Button>
            <span onClick={() => setShowDelete(false)}>&times;</span>
          </div>
        </>
      )}
    </>
  );
}

export default Message;
