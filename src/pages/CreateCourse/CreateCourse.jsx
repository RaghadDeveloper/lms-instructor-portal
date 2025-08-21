import "./CreateCourse.css";
import { useNavigate } from "react-router-dom";
import CourseForm from "../../components/CourseForm/CourseForm";
import axios from "axios";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseDraft } from "../../features/courses/courseDraftSlice";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const draft = useSelector((state) => state.courseDraft.draft);

  const initialCourseData = useMemo(
    () =>
      draft || {
        image_url: "",
        title: "",
        category_id: "",
        requirements_to_start: "",
        description: "",
        price: 0,
        tags: [],
        lessons: [],
      },
    [draft]
  );

  const handleSubmit = async (formData) => {
    let imageUrl = formData.image_url;

    if (formData.image_url instanceof File) {
      const data = new FormData();
      data.append("file", formData.image_url);
      data.append("upload_preset", "Learning_management_system");
      data.append("cloud_name", "dqtqpsg2m");

      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dqtqpsg2m/image/upload",
          data
        );

        if (!response.data.secure_url) {
          alert("Image upload failed");
          return;
        }

        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Image upload failed");
        setIsLoading(false);
        return;
      } finally {
        setIsLoading(false);
      }
    }

    const courseData = { ...formData, image_url: imageUrl, lessons: [] };

    dispatch(addCourseDraft(courseData));

    navigate("/courses/lesson/create", { state: { courseData } });
  };

  return (
    <section className="course-editor">
      <CourseForm
        initialData={initialCourseData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </section>
  );
}

export default CreateCourse;
