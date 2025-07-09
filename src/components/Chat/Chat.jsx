import "./Chat.css";
import img from "./../../assets/images/profileImg.jpg";
import { LuSend } from "react-icons/lu";

function Chat() {
  return (
    <div className="chat">
      <header className="chat-header">
        <img src={img} className="user-img" />
        <p className="user-name">user name</p>
      </header>

      <div className="msgs">
        <div className="msg1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
          nesciunt!
        </div>

        <div className="msg2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          beatae repudiandae rerum deleniti nam eum aspernatur ut quisquam
          impedit. Consequatur.
        </div>

        <div className="msg1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
          nesciunt!
        </div>

        <div className="msg1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
          nesciunt! Lorem ipsum dolor sit amet consectetur.
        </div>
      </div>

      <div className="message-input">
        <textarea placeholder="Write your message..." />
        <button className="send-icon">
          <LuSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
