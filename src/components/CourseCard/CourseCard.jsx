import "./CourseCard.css";
import { FaRegUser, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:8000";

function CourseCard({ course }) {
  const navigate = useNavigate();

  const { id, image_url, rating, title, subscribers_count, price } = course;

  return (
    <div className="course-card" onClick={() => navigate(`${id}`)}>
      <img
        src={`${BASE_URL}/${image_url.replace("public/", "")}`}
        alt="Course Img"
      />

      <div>
        <p className="category">Category</p>
        <div>
          <FaStar className="star" />
          <p>{rating}</p>
        </div>
      </div>
      <h3>{title}</h3>
      <div className="line"></div>
      <div>
        <div>
          <FaRegUser />
          <p>
            {subscribers_count} <span>students</span>
          </p>
        </div>
        <p className="price">{price === "Free" ? price : `$${price}`}</p>
      </div>
    </div>
  );
}

export default CourseCard;
