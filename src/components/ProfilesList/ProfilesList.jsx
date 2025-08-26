import { useSelector } from "react-redux";
import "./ProfilesList.css";
import { FaStar } from "react-icons/fa";

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
              <div>
                <img src={profile.avatar_url} />
                {profile.username}
              </div>
              {profile.rating && (
                <span>
                  <FaStar className="star" /> {profile.rating}
                </span>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default ProfilesList;
