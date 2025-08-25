import "./ProfileCard.css";
import InfoBlock from "../InfoBlock/InfoBlock";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "./../../assets/images/profileImg.jpg";
import UploadImage from "../UploadImage/UploadImage";
import { MdOutlineModeEdit } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import { updateProfile } from "../../features/profile/profileThunks";

function ProfileCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { categories, profile } = useSelector((state) => state.profile);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    if (file) {
      setPreview(URL.createObjectURL(file));
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Learning_management_system");
    data.append("cloud_name", "dqtqpsg2m");

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqtqpsg2m/image/upload",
        data
      );

      const secureUrl = response.data.secure_url;

      if (!secureUrl) {
        alert("Image upload failed");
        return;
      }

      setPreview(URL.createObjectURL(file));
      await dispatch(updateProfile({ avatar_url: secureUrl }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Image upload error:", error);
      setPreview(null);
      alert("Image upload failed");
      return;
    }
  };

  return (
    <div className="profile-card">
      <header className="profile-header">
        <div className={`profile-img ${isLoading ? "disable" : ""}`}>
          <UploadImage
            image={profile?.avatar_url || profileImg}
            Icon={MdOutlineModeEdit}
            preview={preview}
            handleImageChange={handleImageChange}
            disabled={isLoading}
          />
        </div>

        <h2 className="user-name">{profile?.username}</h2>
        <h4 className="headline">{profile?.bio}</h4>
        <div className="info-group">
          <InfoBlock label={"Posts"} value={profile?.posts_count} />
          <InfoBlock label={"Courses"} value={profile?.courses_count} />
          <InfoBlock label={"Followers"} value={profile?.followers_counter} />
        </div>
        <Button
          type={"button"}
          className={"primary"}
          onClick={() => navigate("edit")}
        >
          Edit Profile
        </Button>
      </header>
      <div className="user-info">
        <h5>Email:</h5>
        <p>{profile?.email}</p>
      </div>
      {profile?.birth_date && (
        <div className="user-info">
          <h5>Birth date:</h5>
          <p>{formatDate(profile?.birth_date || "")}</p>
        </div>
      )}
      {categories && (
        <div className="user-info">
          <h5>Specializations:</h5>
          <ul className="specializations">
            {categories?.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      )}
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
