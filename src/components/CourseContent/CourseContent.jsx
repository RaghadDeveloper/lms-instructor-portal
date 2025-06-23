import VideoCard from "../VideoCard/VideoCard";
import "./CourseContent.css";
import Button from "../Button/Button";
import { useNavigate, useParams } from "react-router-dom";

function CourseContent() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  return (
    <div className="course-content">
      <h3>Course Content</h3>
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <Button className={"border"}>&#43; Add Video</Button>
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
