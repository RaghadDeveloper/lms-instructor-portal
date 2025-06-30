import "./VideoInfo.css";
import FileCard from "../FileCard/FileCard";
import Grid from "../Grid/Grid";
import InfoBlock from "../InfoBlock/InfoBlock";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLessonDetails } from "../../features/lessons/lessonsThunk";

function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (hours === 0) return `${minutes}Min`;
  if (minutes === 0) return `${hours}Hr`;
  return `${hours}Hr ${minutes}Min`;
}

function VideoInfo() {
  const dispatch = useDispatch();
  const { lessonId } = useParams();
  const { loading, error, lesson } = useSelector((state) => state.lessons);

  useEffect(() => {
    dispatch(getLessonDetails(lessonId));
  }, [lessonId, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="card">{error}</p>;

  return (
    <div className="video-info">
      <div className="card">
        <video poster={lesson?.image_url} controls>
          <source src={lesson?.video_url} type="video/mp4" />
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
