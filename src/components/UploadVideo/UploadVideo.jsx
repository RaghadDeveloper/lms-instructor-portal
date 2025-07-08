import { IoCloudUpload } from "react-icons/io5";
import "./UploadVideo.css";
import { FaRegTrashCan } from "react-icons/fa6";
import Button from "../Button/Button";

function UploadVideo({
  preview,
  handleVideoChange,
  uploading,
  uploadProgress,
  clearPreview,
  fileSize,
  cancelUpload,
}) {
  const formatSize = (bytes) => {
    if (bytes > 1024 * 1024 * 1024) {
      return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
    }
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  };

  return (
    <div className="upload-video">
      {preview ? (
        <>
          <video controls>
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
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        hidden
        disabled={uploading}
      />

      {(uploading || preview) && (
        <div className="progress">
          <div className="uploading">
            <div className="uploader" style={{ position: "relative" }}>
              <div
                className="uploader-fill"
                style={{
                  width: `${uploadProgress}%`,
                }}
              />
            </div>

            <div>
              {uploadProgress}% ({formatSize((uploadProgress / 100) * fileSize)}{" "}
              / {formatSize(fileSize)})
            </div>
          </div>

          <Button
            className="icon"
            onClick={uploading ? cancelUpload : clearPreview}
          >
            <FaRegTrashCan />
          </Button>
        </div>
      )}
    </div>
  );
}

export default UploadVideo;
