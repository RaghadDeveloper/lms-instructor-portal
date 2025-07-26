import "./LessonInfo.css";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLessonDetails } from "../../features/lessons/lessonsThunk";
import VideoInfo from "../VideoInfo/VideoInfo";
import LessonFiles from "../LessonFiles/LessonFiles";
import LessonComments from "../LessonComments/LessonComments";

function LessonInfo() {
  const dispatch = useDispatch();
  const { lessonId } = useParams();
  const { loading, error, lesson } = useSelector((state) => state.lessons);
  const commentsRef = useRef(null);

  useEffect(() => {
    dispatch(getLessonDetails(lessonId));
  }, [lessonId, dispatch]);

  const handleScrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="card">{error}</p>;

  return (
    <div className="lesson-info">
      <VideoInfo lesson={lesson} onCommentsClick={handleScrollToComments} />

      <LessonFiles />

      <div ref={commentsRef}>
        <LessonComments />
      </div>
    </div>
  );
}

export default LessonInfo;
