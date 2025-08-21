import { useLocation, useNavigate } from "react-router-dom";
import { createCourse } from "../../features/courses/coursesThunk";
import { useDispatch } from "react-redux";
import { useMemo, useRef, useState } from "react";
import LessonForm from "../../components/LessonForm/LessonForm";
import axios from "axios";
import { clearCourseDraft } from "../../features/courses/courseDraftSlice";
function CreateLesson() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseData = location.state?.courseData;

  const cancelTokenSource = useRef(null);
  const [preview, setPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const currentLesson = useMemo(
    () => ({
      image_url: "",
      video_url: "",
      title: "",
      description: "",
      is_free: 0,
      video_duration: 0,
    }),
    []
  );

  const addLessonToList = async (lessonInfo) => {
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

    const uploadedLesson = {
      ...lessonInfo,
      image_url: imageUrl,
      video_url: videoUrl,
      video_duration: parseInt(lessonInfo.video_duration, 10) || 0,
    };

    const finalCourse = {
      ...courseData,
      lessons: [uploadedLesson],
    };

    dispatch(createCourse(finalCourse)).then((resultAction) => {
      if (createCourse.fulfilled.match(resultAction)) {
        dispatch(clearCourseDraft());
        navigate(`/courses`);
      } else {
        alert("Course creation failed");
      }
    });
  };

  return (
    <div className="lesson-editor">
      <LessonForm
        initialData={currentLesson}
        onSubmit={(lessonData) => {
          addLessonToList(lessonData);
        }}
        preview={preview}
        setPreview={setPreview}
        uploadProgress={uploadProgress}
        setUploadProgress={setUploadProgress}
        uploading={uploading}
        setUploading={setUploading}
        cancelTokenSource={cancelTokenSource}
        coursePrice={courseData.price}
      />
    </div>
  );
}

export default CreateLesson;
