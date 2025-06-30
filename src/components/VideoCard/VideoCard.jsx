import "./VideoCard.css";
import { useNavigate } from "react-router-dom";

function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (hours === 0) return `${minutes}Min`;
  if (minutes === 0) return `${hours}Hr`;
  return `${hours}Hr ${minutes}Min`;
}

function VideoCard({ id, lesson }) {
  const navigate = useNavigate();
  const { title, video_duration, is_free } = lesson;
  return (
    <div className="video-card" onClick={() => navigate("lesson/1")}>
      <h4>
        <span>{id}. </span>
        {title}
      </h4>
      <div className="details">
        <p>Duration: {formatTime(video_duration)}</p>
        <p>{is_free ? "Free" : ""}</p>
      </div>
    </div>
  );
}

export default VideoCard;
