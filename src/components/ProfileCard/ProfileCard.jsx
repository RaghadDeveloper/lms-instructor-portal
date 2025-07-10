import "./ProfileCard.css";
import img from "./../../assets/images/profileImg.jpg";
import InfoBlock from "../InfoBlock/InfoBlock";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProfileCard() {
  const navigate = useNavigate();

  return (
    <div className="profile-card">
      <header className="profile-header">
        <img src={img} className="profile-img" />
        <h2 className="user-name">Raghad Muhammad</h2>
        <h4 className="headline">Senior front-end developer</h4>
        <div className="info-group">
          <InfoBlock label={"Articles"} value={"12"} />
          <InfoBlock label={"Courses"} value={"23"} />
          <InfoBlock label={"Followers"} value={"120"} />
        </div>
      </header>
      <div className="user-info">
        <h5>Email:</h5>
        <p>raghadmh620@gmail.com</p>
      </div>
      <div className="user-info">
        <h5>Specializations:</h5>
        <ul className="specializations">
          <li>frontend</li>
          <li>backend</li>
          <li>ui/ux designer</li>
          <li>frontend</li>
        </ul>
      </div>
      <div className="user-info">
        <h5>Change password</h5>
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
