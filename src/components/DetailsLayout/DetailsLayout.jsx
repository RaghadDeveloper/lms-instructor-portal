import "./DetailsLayout.css";
import { Outlet } from "react-router-dom";

function DetailsLayout({ course }) {
  return (
    <div className="details-layout">
      <h3 className="category">{course?.category.name}</h3>
      <div className="info">
        <h2 className="title">{course?.title}</h2>
        <span className={course.approval_status}>{course.approval_status}</span>
      </div>
      <Outlet />
    </div>
  );
}

export default DetailsLayout;
