import { Outlet } from "react-router-dom";
import CourseContent from "../../components/CourseContent/CourseContent";
import CourseInfo from "../../components/CourseInfo/CourseInfo";
import DetailsLayout from "../../components/DetailsLayout/DetailsLayout";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import "./CourseDetails.css";

function CourseDetails() {
  return (
    <div className="course-details">
      <DetailsLayout />
      <CourseContent />
    </div>
  );
}

export default CourseDetails;
