import "./Progress.css";
import { FaRegTrashCan } from "react-icons/fa6";
import Button from "../Button/Button";

const formatSize = (bytes) => {
  if (bytes > 1024 * 1024 * 1024) {
    return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
  }
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
};

function Progress({ uploadProgress, fileSize, cancelUpload }) {
  return (
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
          {uploadProgress}% ({formatSize((uploadProgress / 100) * fileSize)} /{" "}
          {formatSize(fileSize)})
        </div>
      </div>

      <Button className="icon" onClick={cancelUpload}>
        &times;
      </Button>
    </div>
  );
}

export default Progress;
