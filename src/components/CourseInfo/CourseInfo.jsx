import "./CourseInfo.css";
import { FaRegUser, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import InfoBlock from "../InfoBlock/InfoBlock";

function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (hours === 0) return `${minutes}Min`;
  if (minutes === 0) return `${hours}Hr`;
  return `${hours}Hr ${minutes}Min`;
}

function CourseInfo() {
  const { course } = useSelector((state) => state.courses);

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
    approval_status,
    rejection_notes,
  } = course;

  return (
    <div className="course-info">
      <img src={image_url} alt="Course Img" />

      <div className="about">
        <h4>Requirement to Start</h4>
        <p>{requirements_to_start}</p>
      </div>

      <div className="about">
        <h4>Description</h4>
        <p>{description}</p>
      </div>

      {tags.length > 0 && (
        <div className="about">
          <h4>Tags</h4>
          <div className="tags">
            {tags.map((tag, index) => (
              <p key={index}>{tag}</p>
            ))}
          </div>
        </div>
      )}
      {approval_status === "rejected" && (
        <div className="about">
          <h4>Rejection notes</h4>
          <p>{rejection_notes}</p>
        </div>
      )}

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
