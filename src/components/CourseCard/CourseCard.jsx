import "./CourseCard.css";
import courseImg from "./../../assets/images/courseImg.png";
import { FaRegUser, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CourseCard() {
  const navigate = useNavigate();
  return (
    <div className="course-card" onClick={() => navigate("details/1")}>
      <img src={courseImg} alt="courseImg" />
      <div>
        <p className="category">Category</p>
        <div>
          <FaStar className="star" />
          <p>4.5</p>
        </div>
      </div>
      <h3>Course Title</h3>
      <div className="line"></div>
      <div>
        <div>
          <FaRegUser />
          <p>
            23 <span>students</span>
          </p>
        </div>
        <p className="price">$50.00</p>
      </div>
    </div>
  );
}

export default CourseCard;
