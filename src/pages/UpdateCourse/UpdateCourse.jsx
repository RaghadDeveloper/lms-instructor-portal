import "./UpdateCourse.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCourseDetails,
  updateCourse,
} from "../../features/courses/coursesThunk";
import CourseForm from "../../components/CourseForm/CourseForm";
import axios from "axios";

function UpdateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.courses);

  const [initialCourseData, setInitialCourseData] = useState(null);

  useEffect(() => {
    if (courseId) {
      dispatch(getCourseDetails(courseId));
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    if (course) {
      setInitialCourseData({
        image_url: course.image_url,
        title: course.title || "",
        category_id: course.category?.id || "",
        requirements_to_start: course.requirements_to_start || "",
        description: course.description || "",
        price: course.price === "Free" ? 0 : course.price,
        tags: course.tags || [],
      });
    }
  }, [course]);

  const handleSubmit = async (formData) => {
    let imageUrl = formData.image_url;

    if (formData.image_url instanceof File) {
      const data = new FormData();
      data.append("file", formData.image_url);
      data.append("upload_preset", "Learning_management_system");
      data.append("cloud_name", "dqtqpsg2m");

      try {
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
        return;
      }
    }

    const finalCourseInfo = {
      ...formData,
      image_url: imageUrl,
    };

    const resultAction = await dispatch(
      updateCourse({ courseId, courseInfo: finalCourseInfo })
    );

    if (updateCourse.fulfilled.match(resultAction)) {
      navigate(`/courses/${courseId}`);
    }
  };

  return (
    <section className="course-editor">
      {initialCourseData && (
        <CourseForm
          initialData={initialCourseData}
          onSubmit={handleSubmit}
          isUpdate
        />
      )}
    </section>
  );
}

export default UpdateCourse;
