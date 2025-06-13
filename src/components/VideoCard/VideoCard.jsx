import "./VideoCard.css";
import { useNavigate } from "react-router-dom";

function VideoCard() {
  const navigate = useNavigate();
  return (
    <div className="video-card" onClick={() => navigate("lesson")}>
      <h4>
        <span>01. </span>Video Title
      </h4>
      <div className="details">
        <p>Duration: 45Min</p>
        <p>Status: Pending</p>
      </div>
    </div>
  );
}

export default VideoCard;
