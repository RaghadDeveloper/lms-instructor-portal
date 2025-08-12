import "./FileCard.css";
import { useNavigate, useParams } from "react-router-dom";

function FileCard({ file }) {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();

  return (
    <div
      className="file-card"
      onClick={() =>
        navigate(`/courses/${courseId}/lesson/${lessonId}/pdf/${file.id}`, {
          state: { file },
        })
      }
    >
      <img src={file.image_pdf_url} alt="PDF preview" />
      <div className="file-details">
        <h4>{file.title}</h4>
        <p>20 pages</p>
      </div>
    </div>
  );
}

export default FileCard;
