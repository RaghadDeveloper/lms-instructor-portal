import "./UploadProfileImage.css";
import { useState } from "react";
import profileImg from "./../../assets/images/profileImg.jpg";
import { IoIosCamera } from "react-icons/io";

function UploadProfileImage() {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="upload-profile-image position-relative">
      <img src={preview || profileImg} alt="Profile Image" />
      <label htmlFor="fileInput" className="upload-icon">
        <IoIosCamera />
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
      />
    </div>
  );
}

export default UploadProfileImage;
