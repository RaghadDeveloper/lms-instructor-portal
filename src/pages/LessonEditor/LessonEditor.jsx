import "./LessonEditor.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createLesson,
  updateLesson,
} from "../../features/lessons/lessonsThunk";
import LessonForm from "../../components/LessonForm/LessonForm";
import { getLessonDetails } from "../../features/lessons/lessonsThunk";

function LessonEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [preview, setPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const cancelTokenSource = useRef(null);
  const { lessonId } = useParams();
  const { lesson } = useSelector((state) => state.lessons);

  const [initialLessonInfo, setInitialLessonInfo] = useState({
    image_url: "",
    video_url: "",
    course_id: courseId,
    title: "",
    description: "",
    is_free: 0,
    video_duration: 0,
  });

  useEffect(() => {
    if (lessonId) {
      dispatch(getLessonDetails(lessonId));
    }
  }, [lessonId, dispatch]);

  useEffect(() => {
    if (lesson && lessonId) {
      setInitialLessonInfo({
        ...lesson,
        video_duration: parseInt(lesson.video_duration, 10) || 0,
      });
    }
  }, [lesson, lessonId]);

  useEffect(() => {
    setPreview("");
    setUploadProgress(0);
    setUploading(false);
  }, [courseId]);

  async function handleSubmit(lessonInfo) {
    if (!lessonInfo.video_url) alert("vidoerg ejrkgnj");
    let imageUrl = lessonInfo.image_url;
    let videoUrl = lessonInfo.video_url;

    if (lessonInfo.image_url instanceof File) {
      const imgData = new FormData();
      imgData.append("file", lessonInfo.image_url);
      imgData.append("upload_preset", "Learning_management_system");
      imgData.append("cloud_name", "dqtqpsg2m");

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
      } catch (error) {
        alert("Image upload failed" + error);
        return;
      }
    }

    if (lessonInfo.video_url instanceof File) {
      const videoData = new FormData();
      videoData.append("file", lessonInfo.video_url);
      videoData.append("upload_preset", "Learning_management_system");
      videoData.append("cloud_name", "dqtqpsg2m");
      cancelTokenSource.current = axios.CancelToken.source();

      try {
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

        setUploading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Video upload canceled");
        } else {
          alert("Upload failed");
        }
        setUploading(false);
        setUploadProgress(0);
        setPreview("");
        return;
      }
    }

    const finalLessonInfo = {
      ...lessonInfo,
      image_url: imageUrl,
      video_url: videoUrl,
      video_duration: parseInt(lessonInfo.video_duration, 10) || 0,
    };

    if (lessonId) {
      const resultAction = await dispatch(
        updateLesson({ lessonId, lessonInfo: finalLessonInfo })
      );

      if (updateLesson.fulfilled.match(resultAction)) {
        const createdLesson = resultAction.payload.data;
        navigate(`/courses/${courseId}/lesson/${createdLesson.id}`);
      }

      return;
    }

    const resultAction = await dispatch(createLesson(finalLessonInfo));

    if (createLesson.fulfilled.match(resultAction)) {
      const createdLesson = resultAction.payload.data;
      navigate(`/courses/${courseId}/lesson/${createdLesson.id}`);
    }
  }

  return (
    <div className="lesson-editor">
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

export default LessonEditor;
