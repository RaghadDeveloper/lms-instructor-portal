import { useSelector } from "react-redux";
import "./ProfilesList.css";

function ProfilesList({ setIsShow }) {
  const { loading, profiles } = useSelector((state) => state.users);

  return (
    <>
      <div className="overlay" onClick={() => setIsShow(false)} />
      <ul className="profile-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          profiles.map((profile) => (
            <li key={profile.id}>
              <img src={profile.avatar_url} />
              {profile.username}
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default ProfilesList;
