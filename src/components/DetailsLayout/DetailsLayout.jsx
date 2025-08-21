import "./DetailsLayout.css";
import { Outlet, useNavigate } from "react-router-dom";

function DetailsLayout({ course }) {
  const navigate = useNavigate();

  return (
    <div className="details-layout">
      <h3 className="category">{course?.category?.name}</h3>
      <div className="info">
        <h2 className="title" onClick={() => navigate(`/courses/${course.id}`)}>
          {course?.title}
        </h2>
        <span className={course.approval_status}>{course.approval_status}</span>
      </div>
      <Outlet />
    </div>
  );
}

export default DetailsLayout;
