import "./CourseEditor.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCourse,
  getCourseDetails,
  updateCourse,
} from "../../features/courses/coursesThunk";
import FormBody from "../../components/FormBody/FormBody";
import Grid from "../../components/Grid/Grid";
import Select from "../../components/Select/Select";
import TextArea from "../../components/TextArea/TextArea";
import TextInput from "../../components/TextInput/TextInput";
import UploadImage from "../../components/UploadImage/UploadImage";
import Button from "../../components/Button/Button";
import CameraImg from "./../../assets/images/camera.jpg";

function CourseEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { loading, course } = useSelector((state) => state.courses);
  const { categories } = useSelector((state) => state.categories);
  const [tags, setTags] = useState([""]);
  const [preview, setPreview] = useState(courseId ? course.image_url : null);
  // const [hasSubmit, setHasSubmit] = useState(false);

  const [courseInfo, setCourseInfo] = useState({
    image_url: "",
    title: "",
    category_id: "",
    requirements_to_start: "",
    description: "",
    price: "",
    tags,
  });

  const handleChange = (e) => {
    setCourseInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
    setCourseInfo((prev) => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    const newTags = [...tags, ""];
    setTags(newTags);
    setCourseInfo((prev) => ({ ...prev, tags: newTags }));
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setCourseInfo((prev) => ({ ...prev, tags: newTags }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setCourseInfo((prev) => ({ ...prev, image_url: file }));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // setHasSubmit(true);

    if (
      !courseInfo.title ||
      !courseInfo.category_id ||
      !courseInfo.description
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    let imageUrl = courseInfo.image_url;

    if (courseInfo.image_url instanceof File) {
      const data = new FormData();
      data.append("file", courseInfo.image_url);
      data.append("upload_preset", "Learning_management_system");
      data.append("cloud_name", "dqtqpsg2m");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqtqpsg2m/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const imageData = await res.json();

      if (!imageData.secure_url) {
        alert("Image upload failed");
        return;
      }

      imageUrl = imageData.secure_url;
    }

    const finalCourseInfo = {
      ...courseInfo,
      image_url: imageUrl,
    };

    let resultAction;

    if (courseId) {
      resultAction = await dispatch(
        updateCourse({ courseId, courseInfo: finalCourseInfo })
      );
    } else {
      resultAction = await dispatch(createCourse(finalCourseInfo));
    }

    // if (courseId) {

    //   dispatch(updateCourse({ courseId, courseInfo: finalCourseInfo }));
    // } else {
    //   dispatch(createCourse(finalCourseInfo));
    // }

    // if ( hasSubmit &&
    if (
      updateCourse.fulfilled.match(resultAction) ||
      createCourse.fulfilled.match(resultAction)
    ) {
      // dispatch(clearCourseError());
      navigate(`/courses/${courseId}`);
    }
  }

  useEffect(() => {
    if (courseId) {
      dispatch(getCourseDetails(courseId));
      // setPreview(course.image_url);
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    if (courseId && course) {
      setCourseInfo({
        image_url: course.image_url || "",
        title: course.title || "",
        category_id: course.category.id,
        requirements_to_start: course.requirements_to_start || "",
        description: course.description || "",
        price: course.price === "Free" ? 0 : course.price,
        tags: course.tags,
      });
      setTags(course.tags);
    }
  }, [course, courseId]);

  // useEffect(() => {
  //   if (courseId && hasSubmit) {
  //     dispatch(clearCourseError());
  //     navigate("/courses");
  //   }
  // }, [courseId, navigate, hasSubmit, dispatch]);

  return (
    <section className="course-editor">
      <FormBody onSubmit={handleSubmit}>
        <UploadImage
          image={CameraImg}
          // preview={courseInfo.image_url || preview}
          preview={preview}
          handleImageChange={handleImageChange}
        />
        <Grid>
          <TextInput
            id={"title"}
            type={"text"}
            name={"title"}
            label={"Course Title"}
            value={courseInfo.title}
            onChange={handleChange}
          />
          <Select
            name={"category_id"}
            text={"Category"}
            options={categories}
            value={courseInfo.category_id}
            onChange={handleChange}
          />
          <TextArea
            id={"requirement"}
            name={"requirements_to_start"}
            label={"Requirement to start"}
            value={courseInfo.requirements_to_start}
            onChange={handleChange}
          />
          <TextArea
            id={"description"}
            name={"description"}
            label={"Description"}
            value={courseInfo.description}
            onChange={handleChange}
          />
          <TextInput
            id={"price"}
            type={"number"}
            name={"price"}
            label={"Price"}
            value={courseInfo.price === "Free" ? 0 : Number(courseInfo.price)}
            onChange={handleChange}
          />
          {tags.map((tag, index) => (
            <TextInput
              key={index}
              id={`Tag${index + 1}`}
              name={"tags"}
              type={"text"}
              label={`Tag ${index + 1}`}
              value={tags[index]}
              onChange={(e) => handleTagChange(index, e.target.value)}
              onClick={() => removeTag(index)}
            />
          ))}

          <Button type={"button"} className={"border"} onClick={addTag}>
            &#43; Add Tag
          </Button>
        </Grid>
        <Button type={"submit"} className={"primary"} disabled={loading}>
          Continue
        </Button>
      </FormBody>
    </section>
  );
}

export default CourseEditor;
