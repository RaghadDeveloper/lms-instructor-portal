import "./CourseCard.css";
import { FaRegUser, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CourseCard({ course }) {
  const navigate = useNavigate();

  const {
    id,
    image_url,
    category,
    rating,
    title,
    subscribers_count,
    price,
    approval_status,
  } = course;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="course-card"
      onClick={() => navigate(`${id}`)}
    >
      <img src={image_url} alt="Course Img" />

      <div>
        <p className="category">{category?.name}</p>
        <div>
          <FaStar className="star" />
          <p>{rating}</p>
        </div>
      </div>
      <div className="title">
        <h3>{title}</h3>
        <p className={`approval ${approval_status}`}>{approval_status}</p>
        <div className="line"></div>
      </div>
      <div>
        <div>
          <FaRegUser />
          <p>
            {subscribers_count} <span>students</span>
          </p>
        </div>
        <p className="price">{price === "Free" ? price : `$${price}`}</p>
      </div>
    </motion.div>
  );
}

export default CourseCard;
