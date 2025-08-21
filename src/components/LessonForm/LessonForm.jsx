import { useEffect, useState } from "react";
import "./LessonForm.css";
import FormBody from "../FormBody/FormBody";
import Grid from "../Grid/Grid";
import TextInput from "../TextInput/TextInput";
import UploadVideo from "../UploadVideo/UploadVideo";
import FileInput from "../FileInput/FileInput";
import TextArea from "../TextArea/TextArea";
import CheckBox from "../../components/CheckBox/CheckBox";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import Progress from "../Progress/Progress";
import { useParams } from "react-router-dom";

function LessonForm({
  initialData,
  onSubmit,
  cancelTokenSource,
  preview,
  setPreview,
  uploadProgress,
  setUploadProgress,
  uploading,
  setUploading,
  coursePrice,
}) {
  const [lessonInfo, setLessonInfo] = useState(initialData);
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const { loading, error } = useSelector((state) => state.lessons);
  const [isSubmit, setIsSubmit] = useState(false);
  const { lessonId } = useParams();

  useEffect(() => {
    if (!lessonId) return;
    setPreview(initialData.video_url);
    setFileName(initialData.video_url);
  }, [initialData, setPreview, lessonId]);

  useEffect(() => {
    setLessonInfo(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setLessonInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLessonInfo((prev) => ({ ...prev, image_url: file }));
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const videoUrl = URL.createObjectURL(file);
    setPreview(videoUrl);
    setUploading(true);
    setUploadProgress(0);
    setFileSize(file.size);
    setFileName(file.name);

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = videoUrl;

    video.onloadedmetadata = () => {
      const durationInSeconds = Math.ceil(video.duration);

      setLessonInfo((prev) => ({
        ...prev,
        video_url: file,
        video_duration: durationInSeconds,
      }));
    };
  };

  const clearPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview("");
    setUploadProgress(0);
    setUploading(false);
    setFileSize(0);
    setFileName("");

    document.getElementById("fileInput").value = "";
  };

  const cancelUpload = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("User canceled upload.");
    }
    setUploading(false);
    setUploadProgress(0);
    setIsSubmit(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);
    onSubmit(lessonInfo);
  }

  useEffect(() => {
    if (error) {
      alert(error);
      cancelUpload();
      setIsSubmit(false);
    }
  }, [error]);

  return (
    <FormBody onSubmit={handleSubmit}>
      <Grid>
        <UploadVideo
          preview={preview}
          handleVideoChange={handleVideoChange}
          uploading={uploading}
          clearPreview={clearPreview}
          fileName={fileName}
          disabled={loading || isSubmit}
        />

        <TextInput
          id="title"
          type="text"
          label="Lesson Title"
          name="title"
          value={lessonInfo.title}
          onChange={handleChange}
          disabled={loading || isSubmit}
        />

        <FileInput
          id="img"
          label="Lesson cover "
          name="img"
          value={lessonInfo.image_url}
          onChange={handleImageChange}
          disabled={loading || isSubmit}
        />

        <TextArea
          id={"description"}
          name={"description"}
          label={"Description"}
          value={lessonInfo.description}
          onChange={handleChange}
          disabled={loading || isSubmit}
        />

        {coursePrice > 0 && (
          <CheckBox
            id={"is_free"}
            name={"is_free"}
            label={"Free"}
            value={lessonInfo.is_free}
            onChange={handleChange}
            disabled={loading || isSubmit}
          />
        )}
      </Grid>
      <Button
        type={"submit"}
        className={"primary"}
        disabled={loading || isSubmit}
      >
        {loading ? "Loading..." : "Submit"}
      </Button>
      {isSubmit && (
        <Progress
          uploadProgress={uploadProgress}
          fileSize={fileSize}
          cancelUpload={cancelUpload}
        />
      )}
    </FormBody>
  );
}

export default LessonForm;
