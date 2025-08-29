import "./UserItem.css";
import img from "./../../assets/images/profileImg.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteChat,
  getChat,
  getUserProfile,
} from "../../features/chats/chatsThunk";
import { useState } from "react";
import Button from "../Button/Button";

function UserItem({ user, chat }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const { loading } = useSelector((state) => state.chats);

  const handleClick = async (e) => {
    e.stopPropagation();
    if (!chat) {
      console.log(user);
      dispatch(getUserProfile(user.user_id));
      navigate(`/messages/${user.id}`);
    }
    const result = await dispatch(getChat(chat.id));
    if (getChat.fulfilled.match(result)) {
      dispatch(getUserProfile(chat.receiver_id));
      navigate(`/messages/${chat.receiver_id}`);
    }
  };

  const handleDeleteChat = async () => {
    await dispatch(deleteChat({ conversation_id: chat.id }));
  };

  return (
    <>
      <li className="user-item" onClick={handleClick}>
        <img
          src={user?.avatar_url || chat.receiver_avatar || img}
          className="user-img"
        />
        <p className="user-name">{user?.username || chat.receiver_name}</p>
        {chat && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDelete(true);
            }}
          >
            del
          </button>
        )}
      </li>
      {showDelete && (
        <>
          <div className="modal-overlay" onClick={() => setShowDelete(false)} />
          <div className="delete-modal">
            <p>Are you sure you want to delete this Message?</p>
            <Button
              className={"danger"}
              onClick={handleDeleteChat}
              disabled={loading}
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

export default UserItem;
