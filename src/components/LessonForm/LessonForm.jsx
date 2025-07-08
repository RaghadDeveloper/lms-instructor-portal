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
}) {
  const [lessonInfo, setLessonInfo] = useState(initialData);
  const [fileSize, setFileSize] = useState(0);

  useEffect(() => {
    setLessonInfo(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setLessonInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLessonInfo((prev) => ({ ...prev, image_url: file }));
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setUploadProgress(0);
    setFileSize(file.size);
    setLessonInfo((prev) => ({ ...prev, video_url: file }));
  };

  const clearPreview = () => {
    setPreview("");
    setUploadProgress(0);
    setUploading(false);
    setFileSize(0);
    document.getElementById("fileInput").value = "";
  };

  const cancelUpload = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("User canceled upload.");
    }
    clearPreview();
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(lessonInfo);
  }
  return (
    <FormBody onSubmit={handleSubmit}>
      <Grid>
        <UploadVideo
          preview={preview}
          handleVideoChange={handleVideoChange}
          uploading={uploading}
          uploadProgress={uploadProgress}
          fileSize={fileSize}
          clearPreview={clearPreview}
          cancelUpload={cancelUpload}
        />

        <TextInput
          id="title"
          type="text"
          label="Lesson Title"
          name="title"
          value={lessonInfo.title}
          onChange={handleChange}
        />

        <FileInput
          id="img"
          label="Lesson cover "
          name="img"
          onChange={handleImageChange}
        />

        <TextArea
          id={"description"}
          name={"description"}
          label={"Description"}
          value={lessonInfo.description}
          onChange={handleChange}
        />

        <CheckBox
          id={"is_free"}
          name={"is_free"}
          label={"Free"}
          value={lessonInfo.is_free}
          onChange={handleChange}
        />
      </Grid>
      <Button type={"submit"} className={"primary"}>
        Continue
      </Button>
    </FormBody>
  );
}

export default LessonForm;
