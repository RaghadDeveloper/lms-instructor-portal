import { useNavigate } from "react-router-dom";
import "./CreateCourse.css";
import { useDispatch } from "react-redux";
import { createCourse } from "../../features/courses/coursesThunk";
import axios from "axios";
import CourseForm from "../../components/CourseForm/CourseForm";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialCourseData = {
    image_url: "",
    title: "",
    category_id: "",
    requirements_to_start: "",
    description: "",
    price: "",
    tags: [],
  };

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

    const resultAction = await dispatch(createCourse(finalCourseInfo));

    if (createCourse.fulfilled.match(resultAction)) {
      navigate(`/courses/`);
    }
  };

  return (
    <section className="course-editor">
      {initialCourseData && (
        <CourseForm initialData={initialCourseData} onSubmit={handleSubmit} />
      )}
    </section>
  );
}

export default CreateCourse;
