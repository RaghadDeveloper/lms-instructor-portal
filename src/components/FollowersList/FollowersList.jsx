import "./FollowersList.css";
import UserItem from "../UserItem/UserItem";

function FollowersList() {
  return (
    <div className="followers-list">
      <h2>Followers</h2>
      <ul>
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
      </ul>
    </div>
  );
}

export default FollowersList;
