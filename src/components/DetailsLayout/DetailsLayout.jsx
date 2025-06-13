import CourseInfo from "../CourseInfo/CourseInfo";
import VideoInfo from "../VideoInfo/VideoInfo";
import "./DetailsLayout.css";
import { Outlet } from "react-router-dom";

function DetailsLayout() {
  return (
    <div className="details-layout">
      <h3 className="category">Category</h3>
      <h2 className="title">Course Title</h2>
      <Outlet />
    </div>
  );
}

export default DetailsLayout;
