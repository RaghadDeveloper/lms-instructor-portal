import "./DetailsLayout.css";
import { Outlet } from "react-router-dom";

function DetailsLayout({ course }) {
  return (
    <div className="details-layout">
      <h3 className="category">{course?.category.name}</h3>
      <h2 className="title">{course?.title}</h2>
      <Outlet />
    </div>
  );
}

export default DetailsLayout;
