import "./LessonFiles.css";
import Grid from "../Grid/Grid";
import FileCard from "../FileCard/FileCard";
import { useSelector } from "react-redux";
import PdfFileInput from "../PdfFileInput/PdfFileInput";

function LessonFiles() {
  const { files } = useSelector((state) => state.lessonFiles);

  return (
    <div className="lesson-files card">
      <h2>Lesson fils:</h2>
      <Grid>
        {files?.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
        <PdfFileInput />
      </Grid>
    </div>
  );
}

export default LessonFiles;
