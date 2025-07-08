import "./ChatCard.css";
import img from "./../../assets/images/profileImg.jpg";

function ChatCard() {
  return (
    <li className="chat-card">
      <img src={img} className="user-img" />
      <p className="user-name">User Name</p>
    </li>
  );
}

export default ChatCard;
