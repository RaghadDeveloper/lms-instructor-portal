import "./CourseInfo.css";
import { FaRegUser, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import InfoBlock from "../InfoBlock/InfoBlock";
const BASE_URL = "http://localhost:8000";

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
      <img
        src={`${BASE_URL}/${image_url.replace("public/", "")}`}
        alt="Course Img"
      />

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
        <InfoBlock
          label={"price"}
          value={price === "Free" ? price : `$${price}`}
        />
        <InfoBlock label={"Duration"} value={formatTime(course_duration)} />
        <InfoBlock label={"Lessons"} value={lessons_count} />
        <InfoBlock label={"Rating"} value={rating} />
        <InfoBlock label={"Students"} value={subscribers_count} />
      </div>
    </div>
  );
}

export default CourseInfo;
