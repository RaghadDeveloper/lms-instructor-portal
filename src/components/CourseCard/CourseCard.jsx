import "./CourseCard.css";
import { FaRegUser, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CourseCard({ course }) {
  const navigate = useNavigate();
  return (
    <div className="course-card" onClick={() => navigate("details/1")}>
      <img
        src={`/${course.image_url.replace("public/", "")}`}
        alt="Course Img"
      />

      <div>
        <p className="category">Category</p>
        <div>
          <FaStar className="star" />
          <p>{course.rating}</p>
        </div>
      </div>
      <h3>{course.title}</h3>
      <div className="line"></div>
      <div>
        <div>
          <FaRegUser />
          <p>
            {course.subscribers_count} <span>students</span>
          </p>
        </div>
        <p className="price">
          {course.price === "Free" ? course.price : `$${course.price}`}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
