import "./LessonFiles.css";
import Grid from "../Grid/Grid";
import FileCard from "../FileCard/FileCard";

function LessonFiles() {
  return (
    <div className="lesson-files card">
      <h2>Lesson fils:</h2>
      <Grid>
        <FileCard />
        <FileCard />
        <FileCard />
      </Grid>
    </div>
  );
}

export default LessonFiles;
