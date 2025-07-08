import "./LessonInfo.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLessonDetails } from "../../features/lessons/lessonsThunk";
import VideoInfo from "../VideoInfo/VideoInfo";
import LessonFiles from "../LessonFiles/LessonFiles";
import LessonComments from "../LessonComments/LessonComments";

function LessonInfo() {
  const dispatch = useDispatch();
  const { lessonId } = useParams();
  const { loading, error, lesson } = useSelector((state) => state.lessons);

  useEffect(() => {
    dispatch(getLessonDetails(lessonId));
  }, [lessonId, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="card">{error}</p>;

  return (
    <div className="lesson-info">
      <VideoInfo lesson={lesson} />

      <LessonFiles />

      <LessonComments />
    </div>
  );
}

export default LessonInfo;
