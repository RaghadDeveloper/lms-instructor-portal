import "./ProfileCard.css";
import InfoBlock from "../InfoBlock/InfoBlock";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProfileCard() {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);

  return (
    <div className="profile-card">
      <header className="profile-header">
        <img src={profile?.avatar_url} className="profile-img" />
        <h2 className="user-name">{profile?.user.username}</h2>
        <h4 className="headline">{profile?.bio}</h4>
        <div className="info-group">
          <InfoBlock label={"Articles"} value={"X"} />
          <InfoBlock label={"Courses"} value={"X"} />
          <InfoBlock label={"Followers"} value={profile?.followers_counter} />
        </div>
      </header>
      <div className="user-info">
        <h5>Email:</h5>
        <p>{profile?.user.email}</p>
      </div>
      <div className="user-info">
        <h5>Birth date:</h5>
        <p>{profile?.birth_date}</p>
      </div>
      <div className="user-info">
        <h5>Specializations:</h5>
        <ul className="specializations">
          <li>XXX</li>
          <li>XXX</li>
          <li>XXX</li>
          <li>XXX</li>
        </ul>
      </div>
      <div className="user-info">
        <h5>Change password:</h5>
        <div className="password">
          <p>*********</p>
          <button
            onClick={() => {
              navigate("/reset-password");
            }}
          >
            <FaRegEdit />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
