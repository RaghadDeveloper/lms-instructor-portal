import "./UserItem.css";
import img from "./../../assets/images/profileImg.jpg";

function UserItem({ user }) {
  return (
    <li className="user-item">
      <img src={user?.avatar_url || img} className="user-img" />
      <p className="user-name">{user?.username || "User Name"}</p>
    </li>
  );
}

export default UserItem;
