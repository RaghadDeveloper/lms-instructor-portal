import { IoCloudUpload } from "react-icons/io5";
import "./UploadVideo.css";
import { useState, useRef } from "react";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import Button from "../Button/Button";

function UploadVideo() {
  const [preview, setPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const cancelTokenSource = useRef(null);

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setUploadProgress(0);
    setFileSize(file.size);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Learning_management_system");
    formData.append("cloud_name", "dqtqpsg2m");

    cancelTokenSource.current = axios.CancelToken.source();

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqtqpsg2m/video/upload",
        formData,
        {
          cancelToken: cancelTokenSource.current.token,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      console.log("Uploaded:", res.data.secure_url);
      setUploading(false);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Upload canceled");
      } else {
        console.error("Upload failed", err);
      }
      setUploading(false);
      setUploadProgress(0);
      setPreview("");
    }
  };

  const cancelUpload = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("User canceled upload.");
    }
    clearPreview();
  };

  const formatSize = (bytes) => {
    if (bytes > 1024 * 1024 * 1024) {
      return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
    }
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  };

  const clearPreview = () => {
    setPreview("");
    setUploadProgress(0);
    setUploading(false);
    setFileSize(0);
    document.getElementById("fileInput").value = "";
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
