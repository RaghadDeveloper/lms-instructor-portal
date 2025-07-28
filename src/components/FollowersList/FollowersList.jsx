import "./FollowersList.css";
import UserItem from "../UserItem/UserItem";
import { useSelector } from "react-redux";

function FollowersList() {
  const { followers } = useSelector((state) => state.profile);

  return (
    <div className="followers-list">
      <h2>Followers</h2>
      {!followers && <p>You don't have followers :( </p>}
      {followers?.map((follower) => (
        <UserItem key={follower.id} user={follower} />
      ))}
    </div>
  );
}

export default FollowersList;
