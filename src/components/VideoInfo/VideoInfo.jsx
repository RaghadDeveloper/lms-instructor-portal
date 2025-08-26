import { useNavigate, useParams } from "react-router-dom";
import "./VideoInfo.css";
import { FaRegEdit } from "react-icons/fa";
import InfoBlock from "../InfoBlock/InfoBlock";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../../features/users/usersThunk";
import { useDispatch } from "react-redux";
import ProfilesList from "../ProfilesList/ProfilesList";

function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (hours === 0) return `${minutes}Min`;
  if (minutes === 0) return `${hours}Hr`;
  return `${hours}Hr ${minutes}Min`;
}

function VideoInfo({ lesson, onCommentsClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfilesList, setShowProfilesList] = useState(false);
  const { lessonId, courseId } = useParams();

  useEffect(() => {
    if (showProfilesList) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showProfilesList]);

  const handleGetViews = async () => {
    if (!lesson?.views_count) return;
    setShowProfilesList(true);
    await dispatch(getAllProfiles({ views_lesson_id: lessonId }));
  };

  return (
    <>
      <div className="video-info card">
        <video poster={lesson?.image_url} controls>
          <source src={lesson?.video_url} type="video/mp4" />
        </video>

        <div className="header">
          <h2>
            <span>01. </span>
            {lesson?.title}
          </h2>
          <button
            className="edit-btn"
            onClick={() =>
              navigate(`/courses/${courseId}/lesson/edit/${lessonId}`)
            }
          >
            <FaRegEdit />
          </button>
        </div>

        <p>{lesson?.description}</p>
        <div className="row">
          <InfoBlock
            label={"Duration"}
            value={lesson && formatTime(lesson?.video_duration)}
          />
          <InfoBlock
            label={"views"}
            value={lesson?.views_count}
            onClick={handleGetViews}
          />
          <InfoBlock label={"Likes"} value={lesson?.likes_count} />
          <InfoBlock
            label={"Comments"}
            value={lesson?.comment_count}
            onClick={onCommentsClick}
          />
        </div>
      </div>
      {showProfilesList && <ProfilesList setIsShow={setShowProfilesList} />}
    </>
  );
}

export default VideoInfo;
