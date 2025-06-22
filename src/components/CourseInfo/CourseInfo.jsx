import "./CourseInfo.css";
import { FaRegUser, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

function CourseInfo() {
  const { course, loading, error } = useSelector((state) => state.course);

  if (loading) return <p>Loading course...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!course) return <p>No course found.</p>;

  const {
    image_url,
    requirements_to_start,
    description,
    price,
    course_duration,
    lessons_count,
    rating,
    subscribers_count,
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

      <div className="row">
        <div>
          <h4>Price </h4>
          <span>{price}</span>
        </div>

        <div>
          <h4>Duration </h4>
          {/* <span>12Hr 30Min</span> */}
          <span>{course_duration}</span>
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
