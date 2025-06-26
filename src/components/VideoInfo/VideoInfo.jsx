import "./VideoInfo.css";
import video from "../../assets/images/video.mp4";
import courseImg from "../../assets/images/courseImg.png";
import { BsEye } from "react-icons/bs";
import FileCard from "../FileCard/FileCard";
import Grid from "../Grid/Grid";
import InfoBlock from "../InfoBlock/InfoBlock";

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
          <InfoBlock label={"Duration"} value={"2Hr 30Min"} />
          <InfoBlock label={"views"} value={"23"} />
          <InfoBlock label={"Likes"} value={"50"} />
          <InfoBlock label={"Comments"} value={"24"} />
          <InfoBlock label={"Reports"} value={"4"} />
        </div>
      </div>

      <div className="card">
        <h2>Lesson fils:</h2>
        <Grid>
          <FileCard />
          <FileCard />
          <FileCard />
        </Grid>
      </div>

      <div className="card">
        <h2>Comments:</h2>
      </div>
    </div>
  );
}

export default VideoInfo;
