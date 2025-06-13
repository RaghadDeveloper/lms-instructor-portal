import VideoCard from "../VideoCard/VideoCard";
import "./CourseContent.css";
import Button from "../Button/Button";

function CourseContent() {
  return (
    <div className="course-content">
      <h3>Course Content</h3>
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <Button className={"border"}>&#43; Add Video</Button>
    </div>
  );
}

export default CourseContent;
