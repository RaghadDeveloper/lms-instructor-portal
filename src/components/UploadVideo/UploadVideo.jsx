import { IoCloudUpload } from "react-icons/io5";
import "./UploadVideo.css";
import Button from "../Button/Button";
import { FaRegTrashCan } from "react-icons/fa6";

function UploadVideo({
  preview,
  handleVideoChange,
  uploading,
  clearPreview,
  fileName,
  disabled,
}) {
  return (
    <div className="upload-video">
      {preview ? (
        <>
          <video controls className={`${disabled ? "disabled" : ""}`}>
            <source src={preview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        <label htmlFor="fileInput" className="upload-icon">
          <span>
            <IoCloudUpload />
          </span>
          Upload Video
        </label>
      )}
      <input
        id="fileInput"
        name="video"
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        hidden
        disabled={uploading || disabled}
        // required
      />
      {(uploading || preview) && (
        <div className="loading-info">
          <div className="name">{fileName}</div>

          <Button
            type={"button"}
            className="icon"
            onClick={clearPreview}
            disabled={disabled}
          >
            <FaRegTrashCan />
          </Button>
        </div>
      )}
    </div>
  );
}

export default UploadVideo;
