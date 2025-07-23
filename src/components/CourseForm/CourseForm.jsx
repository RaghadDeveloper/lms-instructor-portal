import "./CourseForm.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CameraImg from "./../../assets/images/camera.jpg";
import FormBody from "../FormBody/FormBody";
import UploadImage from "../UploadImage/UploadImage";
import Grid from "../Grid/Grid";
import TextInput from "../TextInput/TextInput";
import Select from "../Select/Select";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";

function CourseForm({ initialData, onSubmit, isUpdate, isLoading }) {
  const { categories } = useSelector((state) => state.categories);
  const { loading, error } = useSelector((state) => state.courses);

  const [formData, setFormData] = useState(initialData);
  const [tags, setTags] = useState(initialData.tags || []);
  const [preview, setPreview] = useState(
    initialData.image_url instanceof File ? null : initialData.image_url
  );

  useEffect(() => {
    setFormData(initialData);
    setTags(initialData.tags || []);
    setPreview(
      initialData.image_url instanceof File ? null : initialData.image_url
    );
  }, [initialData]);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    const newTags = [...tags, ""];
    setTags(newTags);
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image_url: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category_id ||
      !formData.description ||
      !formData.image_url
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit({ ...formData, tags });
  };

  return (
    <FormBody onSubmit={handleSubmit}>
      <UploadImage
        image={CameraImg}
        preview={preview}
        handleImageChange={handleImageChange}
        disabled={loading || isLoading}
      />
      <Grid>
        <TextInput
          id="title"
          name="title"
          label="Course Title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          disabled={loading || isLoading}
        />
        <Select
          name="category_id"
          text="Category"
          options={categories}
          value={formData.category_id}
          onChange={handleChange}
          disabled={loading || isLoading}
        />
        <TextArea
          id="requirement"
          name="requirements_to_start"
          label="Requirement to start"
          value={formData.requirements_to_start}
          onChange={handleChange}
          disabled={loading || isLoading}
        />
        <TextArea
          id="description"
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading || isLoading}
        />
        <TextInput
          id="price"
          name="price"
          type="number"
          label="Price"
          value={formData.price === "Free" ? 0 : Number(formData.price)}
          onChange={handleChange}
          disabled={loading || isLoading}
        />
        {tags.map((tag, index) => (
          <TextInput
            key={index}
            id={`tag-${index}`}
            name="tags"
            type="text"
            label={`Tag ${index + 1}`}
            value={tag}
            onChange={(e) => handleTagChange(index, e.target.value)}
            onClick={() => removeTag(index)}
            disabled={loading || isLoading}
          />
        ))}
        <Button
          type="button"
          className="border"
          onClick={addTag}
          disabled={loading || isLoading}
        >
          + Add Tag
        </Button>
      </Grid>
      <Button type="submit" className="primary" disabled={loading || isLoading}>
        {isUpdate
          ? `${loading ? "Submitting..." : "Submit"}`
          : `${loading ? "Loading..." : "Continue"}`}
      </Button>
    </FormBody>
  );
}

export default CourseForm;
