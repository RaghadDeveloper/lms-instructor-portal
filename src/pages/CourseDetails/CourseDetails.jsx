import "./CourseDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCourseDetails } from "../../features/courses/coursesThunk";
import CourseContent from "../../components/CourseContent/CourseContent";
import DetailsLayout from "../../components/DetailsLayout/DetailsLayout";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { getAllLessons } from "../../features/lessons/lessonsThunk";

function CourseDetails() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course, loading, error } = useSelector((state) => state.courses);
  const { lessons } = useSelector((state) => state.lessons);

  useEffect(() => {
    if (!courseId) return;
    dispatch(getCourseDetails(courseId));
    dispatch(getAllLessons(courseId));
  }, [dispatch, courseId]);

  if (loading || !course) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div className="course-details">
      <DetailsLayout course={course} />
      <CourseContent lessons={lessons} />
    </div>
  );
}

export default CourseDetails;
