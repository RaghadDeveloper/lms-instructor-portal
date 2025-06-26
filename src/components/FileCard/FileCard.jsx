import "./FileCard.css";
import courseImg from "../../assets/images/courseImg.png";

function FileCard() {
  return (
    <div className="file-card">
      <img src={courseImg} />
      <div className="file-details">
        <h4>Lesson Tilte</h4>
        <p>20 pages</p>
      </div>
    </div>
  );
}

export default FileCard;
