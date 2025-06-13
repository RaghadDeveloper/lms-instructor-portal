import "./VideoInfo.css";
import video from "../../assets/images/video.mp4";
import courseImg from "../../assets/images/courseImg.png";
import { BsEye } from "react-icons/bs";

function VideoInfo() {
  return (
    <div className="video-info">
      <div className="card">
        <video poster={courseImg} controls>
          <source src={video} type="video/mp4" />
        </video>

        <h2>
          <span>01. </span>Video Title
        </h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cumque
          laborum soluta delectus magni nam iure nihil? Voluptatum consectetur
          dicta quo expedita non, corrupti quaerat unde fugit explicabo nam
          voluptatibus.
        </p>
        <div className="row">
          <div>
            <h4>Duration </h4>
            <span>2Hr 30Min</span>
          </div>

          <div>
            <h4>views</h4>
            <span>23</span>
          </div>

          <div>
            <h4>Likes </h4>
            <span>50</span>
          </div>

          <div>
            <h4>Comments </h4>
            <span>24</span>
          </div>

          <div>
            <h4>Reports</h4>
            <span>4</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Lesson fils:</h2>
      </div>

      <div className="card">
        <h2>Comments:</h2>
      </div>
    </div>
  );
}

export default VideoInfo;
