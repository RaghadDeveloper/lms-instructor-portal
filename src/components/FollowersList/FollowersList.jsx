import "./FollowersList.css";
import UserItem from "../UserItem/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { getMyFollowers } from "../../features/profile/profileThunks";

function FollowersList() {
  const dispatch = useDispatch();
  const { followers, pagination } = useSelector((state) => state.profile);

  const getMoreFollowers = async () => {
    await dispatch(getMyFollowers(pagination.currentPage + 1));
  };

  return (
    <div className="followers-list">
      <h2>Followers</h2>
      {!followers?.length && (
        <p className="no-followers">You don't have any follower yet :( </p>
      )}
      {followers?.map((follower) => (
        <UserItem key={follower.id} user={follower} />
      ))}
      {pagination.currentPage !== pagination.lastPage && (
        <p onClick={getMoreFollowers} className="see-more">
          see more
        </p>
      )}
    </div>
  );
}

export default FollowersList;
