import VideoCard from "../VideoCard/VideoCard";
import "./CourseContent.css";
import Button from "../Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLessons } from "../../features/lessons/lessonsThunk";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

function CourseContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { loading, error, lessons } = useSelector((state) => state.lessons);

  useEffect(() => {
    if (!courseId) navigate("/");
    else dispatch(getAllLessons(courseId));
  }, [courseId, dispatch, navigate]);

  if (loading) return <p>Loading course content...</p>;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div className="course-content">
      <h3>Course Content</h3>

      {lessons.map((lesson, index) => (
        <VideoCard key={index} id={index + 1} lesson={lesson} />
      ))}

      <Button className={"border"} onClick={() => navigate("lesson/create")}>
        &#43; Add Video
      </Button>

      <Button
        className={"border"}
        onClick={() => navigate(`/courses/edit/${courseId}`)}
      >
        Edit course
      </Button>
    </div>
  );
}

export default CourseContent;
