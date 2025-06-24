import "./CourseCard.css";
import { FaRegUser, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CourseCard({ course }) {
  const navigate = useNavigate();
  // console.log(course.image_url);
  return (
    <div className="course-card" onClick={() => navigate(`${course.id}`)}>
      {/* http://localhost:8000/storage/coursecover.png */}
      {/* public/storage/courses/images/coursecover.png */}
      {/* <img
        src={`/${course.image_url.replace("public/", "")}`}
        alt="Course Img"
      /> */}

      {/* <img src={`/storage/courses/images/coursecover.png`} alt="Course Img" /> */}

      <img
        src={`http://localhost:8000/${course.image_url.replace("public/", "")}`}
        alt="Course Img"
      />

      {/* <img
        src={`http://localhost:8000/${course.image_url.replace("public/", "")}`}
        alt="Course Img"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.png"; // Make sure this exists in public/
        }}
      /> */}

      {/* <img
        src="http://localhost:8000/storage/courses/images/coursecover.png"
        alt="Test Image"
        onError={() => console.log("Image failed to load")}
      /> */}

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
