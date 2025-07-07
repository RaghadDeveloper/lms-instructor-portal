import VideoCard from "../VideoCard/VideoCard";
import "./CourseContent.css";
import Button from "../Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

function CourseContent({ lessons }) {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div className="course-content">
      <h3>Course Content</h3>

      {lessons?.map((lesson, index) => (
        <VideoCard key={index} num={index + 1} lesson={lesson} />
      ))}

      {!lessons && <p>This course doesn't have any lesson.</p>}

      <Button className={"border"} onClick={() => navigate("lesson/create")}>
        &#43; Add Video
      </Button>

      <Button
        className={"border"}
        onClick={() => navigate(`/courses/edit/${courseId}`)}
      >
        Edit course
      </Button>
    </div>
  );
}

export default CourseContent;
