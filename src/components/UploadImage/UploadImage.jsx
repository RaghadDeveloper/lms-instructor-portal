import "./UploadImage.css";
import CameraImg from "./../../assets/images/camera.jpg";

function UploadImage({ image, Icon, preview, handleImageChange }) {
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

export default UploadImage;
