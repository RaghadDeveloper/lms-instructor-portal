import { useNavigate, useParams } from "react-router-dom";
import "./VideoInfo.css";
import { FaRegEdit } from "react-icons/fa";
import InfoBlock from "../InfoBlock/InfoBlock";

function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (hours === 0) return `${minutes}Min`;
  if (minutes === 0) return `${hours}Hr`;
  return `${hours}Hr ${minutes}Min`;
}

function VideoInfo({ lesson }) {
  const navigate = useNavigate();
  const { lessonId, courseId } = useParams();

  return (
    <div className="video-info card">
      <video poster={lesson?.image_url} controls>
        <source src={lesson?.video_url} type="video/mp4" />
      </video>

      <div className="header">
        <h2>
          <span>01. </span>Video Title
        </h2>
        <button
          onClick={() =>
            navigate(`/courses/${courseId}/lesson/edit/${lessonId}`)
          }
        >
          <FaRegEdit />
        </button>
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cumque
        laborum soluta delectus magni nam iure nihil? Voluptatum consectetur
        dicta quo expedita non, corrupti quaerat unde fugit explicabo nam
        voluptatibus.
      </p>
      <div className="row">
        <InfoBlock
          label={"Duration"}
          value={lesson && formatTime(lesson?.video_duration)}
        />
        <InfoBlock label={"views"} value={lesson?.views_count} />
        <InfoBlock label={"Likes"} value={lesson?.likes_count} />
        <InfoBlock label={"Comments"} value={lesson?.comment_count} />
        <InfoBlock label={"Reports"} value={"X"} />
      </div>
    </div>
  );
}

export default VideoInfo;
