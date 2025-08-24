import "./VideoCard.css";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (hours === 0) return `${minutes}Min`;
  if (minutes === 0) return `${hours}Hr`;
  return `${hours}Hr ${minutes}Min`;
}

function VideoCard({ num, lesson }) {
  const navigate = useNavigate();
  const { id, title, video_duration, is_free } = lesson;
  const { lessonId } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`video-card ${id == lessonId ? "active" : "f"}`}
      onClick={() => navigate(`lesson/${id}`)}
    >
      <h4>
        <span>{num > 9 ? num : "0" + num}. </span>
        {title}
      </h4>
      <div className="details">
        <p>Duration: {formatTime(video_duration)}</p>
        <p>{is_free ? "Free" : ""}</p>
      </div>
    </motion.div>
  );
}

export default VideoCard;
