import "./AddCourse.css";
import { useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import Grid from "../../components/Grid/Grid";
import Select from "../../components/Select/Select";
import TextArea from "../../components/TextArea/TextArea";
import TextInput from "../../components/TextInput/TextInput";
import UploadProfileImage from "../../components/UploadProfileImage/UploadProfileImage";
import Button from "../../components/Button/Button";
import CameraImg from "./../../assets/images/camera.jpg";

function AddCourse() {
  const category = ["Web Development", "Graphic Design", "Data Science"];
  const [tags, setTags] = useState([""]);

  // const handleTagChange = (index, value) => {
  //   const newTags = [...tags];
  //   newTags[index] = value;
  //   setTags(newTags);
  // };

  const addTag = () => {
    setTags([...tags, ""]);
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };
  return (
    <section className="add-course">
      <AuthForm>
        <UploadProfileImage image={CameraImg} />
        <Grid>
          <TextInput id={"title"} type={"text"} label={"Course Title"} />
          <Select text={"Category"} options={category} />
          <TextArea id={"requirement"} label={"Requirement to start"} />
          <TextArea id={"description"} label={"Description"} />
          <TextInput id={"price"} type={"number"} label={"Price"} />
          {tags.map((tag, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <TextInput
                id={`Tag${index + 1}`}
                name={"tags"}
                type={"text"}
                label={`Tag ${index + 1}`}
                onClick={() => removeTag(index)}
              />
            </div>
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
