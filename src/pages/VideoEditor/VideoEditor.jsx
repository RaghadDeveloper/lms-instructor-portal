import "./VideoEditor.css";
import { useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createLesson } from "../../features/lessons/lessonsThunk";
import LessonForm from "../../components/LessonForm/LessonForm";

function VideoEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [preview, setPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const cancelTokenSource = useRef(null);

  const { lesson } = useSelector((state) => state.lessons);
  const initialLessonInfo = {
    image_url: "",
    video_url: "",
    course_id: courseId,
    title: "",
    description: "",
    is_free: true,
  };

  async function handleSubmit(lessonInfo) {
    console.log(lessonInfo);
    let imageUrl = lessonInfo.image_url;
    let videoUrl = lessonInfo.video_url;

    if (
      lessonInfo.image_url instanceof File &&
      lessonInfo.video_url instanceof File
    ) {
      const imgData = new FormData();
      imgData.append("img_file", lessonInfo.image_url);
      imgData.append("upload_preset", "Learning_management_system");
      imgData.append("cloud_name", "dqtqpsg2m");

      const videoData = new FormData();
      videoData.append("file", lessonInfo.video_url);
      videoData.append("upload_preset", "Learning_management_system");
      videoData.append("cloud_name", "dqtqpsg2m");
      cancelTokenSource.current = axios.CancelToken.source();

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dqtqpsg2m/image/upload",
          imgData
        );
        if (!response.data.secure_url) {
          alert("Image upload failed");
          return;
        }
        imageUrl = response.data.secure_url;

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dqtqpsg2m/video/upload",
          videoData,
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
        if (!res.data.secure_url) {
          alert("Video upload failed");
          return;
        }
        videoUrl = res.data.secure_url;

        console.log("Uploaded:", res.data.secure_url);
        setUploading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Upload canceled");
        } else {
          console.error("Upload failed", error);
          alert("Upload failed");
        }
        setUploading(false);
        setUploadProgress(0);
        setPreview("");
      }
    }

    const finalLessonInfo = {
      ...lessonInfo,
      image_url: imageUrl,
      video_url: videoUrl,
    };

    console.log(finalLessonInfo);

    const resultAction = await dispatch(createLesson(finalLessonInfo));

    if (createLesson.fulfilled.match(resultAction)) {
      navigate(`lesson/${lesson.id}`);
    }
  }

  return (
    <div className="video-editor">
      <LessonForm
        initialData={initialLessonInfo}
        onSubmit={handleSubmit}
        cancelTokenSource={cancelTokenSource}
        preview={preview}
        setPreview={setPreview}
        uploadProgress={uploadProgress}
        setUploadProgress={setUploadProgress}
        uploading={uploading}
        setUploading={setUploading}
      />
    </div>
  );
}

export default VideoEditor;
