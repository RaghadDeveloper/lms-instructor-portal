import "./UploadImage.css";
import CameraImg from "./../../assets/images/camera.jpg";

function UploadImage({ image, Icon, preview, handleImageChange, disabled }) {
  return (
    <div className="upload-image">
      <img src={preview || image || CameraImg} alt="Upload Image" />
      <label
        htmlFor="fileInput"
        className={`upload-icon ${disabled ? "disabled" : ""}`}
      >
        {Icon ? <Icon /> : <span>&#43;</span>}
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
        disabled={disabled}
      />
    </div>
  );
}

export default UploadImage;
