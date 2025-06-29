import "./VideoEditor.css";
import { useState } from "react";
import FormBody from "../../components/FormBody/FormBody";
import Grid from "../../components/Grid/Grid";
import TextInput from "../../components/TextInput/TextInput";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";
import FileInput from "../../components/FileInput/FileInput";
import CheckBox from "../../components/CheckBox/CheckBox";
import UploadVideo from "../../components/UploadVideo/UploadVideo";

function VideoEditor() {
  const [lessonInfo, setLessonInfo] = useState({
    image_url: "",
    video_url: "",
    course_id: "",
    title: "",
    description: "",
    is_free: false,
  });
  const handleChange = (e) => {
    setLessonInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="video-editor">
      <FormBody>
        <Grid>
          <UploadVideo />

          <TextInput
            id="title"
            type="text"
            label="Lesson Title"
            name="title"
            value={lessonInfo.title}
            onChange={handleChange}
          />

          <FileInput
            id="img"
            label="Lesson cover "
            name="img"
            onChange={handleChange}
          />

          <TextArea
            id={"description"}
            name={"description"}
            label={"Description"}
            value={lessonInfo.description}
            onChange={handleChange}
          />

          <CheckBox label={"Free"} />
        </Grid>
        <Button type={"submit"} className={"primary"}>
          Continue
        </Button>
      </FormBody>
    </div>
  );
}

export default VideoEditor;
