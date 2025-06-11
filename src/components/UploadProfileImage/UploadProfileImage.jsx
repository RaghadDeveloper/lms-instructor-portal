import "./UploadProfileImage.css";
import { useState } from "react";
import CameraImg from "./../../assets/images/camera.jpg";

function UploadProfileImage({ image, Icon }) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="upload-image">
      <img src={preview || image || CameraImg} alt="Upload Image" />
      <label htmlFor="fileInput" className="upload-icon">
        {Icon ? <Icon /> : <span>&#43;</span>}
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
