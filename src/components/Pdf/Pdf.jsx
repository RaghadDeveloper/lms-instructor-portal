import "./Pdf.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Pdf() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, lessonId } = useParams();
  const file = location.state?.file;
  return (
    <div className="pdf">
      <h3>{file.title}</h3>
      <span onClick={() => navigate(`/courses/${courseId}/lesson/${lessonId}`)}>
        &times;
      </span>
      <iframe src={file.pdf_url} width="100%" height="600px"></iframe>
    </div>
  );
}

export default Pdf;
