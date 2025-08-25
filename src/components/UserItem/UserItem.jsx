import "./UserItem.css";
import img from "./../../assets/images/profileImg.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getChat, getUserProfile } from "../../features/chats/chatsThunk";

function UserItem({ user, chat }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!chat) return;
    const result = await dispatch(getChat(chat.id));
    if (getChat.fulfilled.match(result)) {
      dispatch(getUserProfile(chat.receiver_id));
      navigate(`/messages/${chat.receiver_id}`);
    }
  };

  return (
    <li className="user-item" onClick={handleClick}>
      <img
        src={user?.avatar_url || chat.receiver_avatar || img}
        className="user-img"
      />
      <p className="user-name">{user?.username || chat.receiver_name}</p>
    </li>
  );
}

export default UserItem;
