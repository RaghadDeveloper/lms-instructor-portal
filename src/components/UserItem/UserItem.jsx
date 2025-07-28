import "./UserItem.css";
import img from "./../../assets/images/profileImg.jpg";

function UserItem() {
  return (
    <li className="user-item">
      <img src={img} className="user-img" />
      <p className="user-name">User Name</p>
    </li>
  );
}

export default UserItem;
