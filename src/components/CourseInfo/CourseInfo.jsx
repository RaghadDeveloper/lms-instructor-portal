import "./CourseInfo.css";
import { FaRegUser, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return `${hours}Hr ${minutes}Min`;
}

function CourseInfo() {
  const { course } = useSelector((state) => state.course);

  const {
    image_url,
    requirements_to_start,
    description,
    price,
    course_duration,
    lessons_count,
    rating,
    subscribers_count,
    tags,
  } = course;

  return (
    <div className="course-info">
      <img src={`/${image_url.replace("public/", "")}`} />

      <div className="about">
        <h4>Requirement to Start</h4>
        <p>{requirements_to_start}</p>
      </div>

      <div className="about">
        <h4>Description</h4>
        <p>{description}</p>
      </div>

      <div className="about">
        <h4>Tags</h4>
        <div className="tags">
          {tags.map((tag, index) => (
            <p key={index}>{tag}</p>
          ))}
        </div>
      </div>

      <div className="row">
        <div>
          <h4>Price </h4>
          <span>{price === "Free" ? price : `$${price}`}</span>
        </div>

        <div>
          <h4>Duration </h4>
          {/* <span>12Hr 30Min</span> */}
          <span>{formatTime(course_duration)}</span>
        </div>

        <div>
          <h4>Lessons </h4>
          <span>{lessons_count}</span>
        </div>

        <div>
          <h4>Rating</h4>
          <div>
            {/* <FaStar className="star" /> */}
            <span> {rating}</span>
          </div>
        </div>

        <div>
          <h4>students</h4>
          <div>
            {/* <FaRegUser /> */}
            <span> {subscribers_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
