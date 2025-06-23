import "./AddCourse.css";
import { useEffect, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import Grid from "../../components/Grid/Grid";
import Select from "../../components/Select/Select";
import TextArea from "../../components/TextArea/TextArea";
import TextInput from "../../components/TextInput/TextInput";
import UploadProfileImage from "../../components/UploadProfileImage/UploadProfileImage";
import Button from "../../components/Button/Button";
import CameraImg from "./../../assets/images/camera.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  getCourseDetails,
  updateCourse,
} from "../../features/course/courseThunk";
import { useParams } from "react-router-dom";

function AddCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const { categories } = useSelector((state) => state.category);
  const [tags, setTags] = useState([""]);
  const [preview, setPreview] = useState(null);

  const [courseInfo, setCourseInfo] = useState({
    image_url: "",
    title: "",
    category_id: "",
    requirements_to_start: "",
    description: "",
    price: "",
    tags,
  });
  useEffect(() => {
    if (courseId && course) {
      setCourseInfo({
        image_url: course.image_url || "",
        title: course.title || "",
        category_id: course.category_id || "",
        requirements_to_start: course.requirements_to_start || "",
        description: course.description || "",
        price: course.price === "Free" ? 0 : course.price,
        tags: course.tags,
      });
      setTags(course.tags);
    }
  }, [course, courseId]);

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

  function handleSubmit(e) {
    e.preventDefault();
    if (courseId) dispatch(updateCourse({ courseId, courseInfo }));
    else dispatch(createCourse(courseInfo));
  }

  useEffect(() => {
    if (courseId) dispatch(getCourseDetails(courseId));
  }, [courseId, dispatch]);

  return (
    <section className="add-course">
      <AuthForm onSubmit={handleSubmit}>
        <UploadProfileImage
          image={CameraImg}
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
        <Button type={"submit"} className={"primary"}>
          Continue
        </Button>
      </AuthForm>
    </section>
  );
}

export default AddCourse;
