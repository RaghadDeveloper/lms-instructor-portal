import { useParams } from "react-router-dom";
import CourseContent from "../../components/CourseContent/CourseContent";
import DetailsLayout from "../../components/DetailsLayout/DetailsLayout";
import "./CourseDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCourseDetails } from "../../features/course/courseThunk";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function CourseDetails() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    if (courseId) {
      dispatch(getCourseDetails(courseId));
    }
  }, [dispatch, courseId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!course) return <p>No course found.</p>;

  return (
    <div className="course-details">
      <DetailsLayout course={course} />
      <CourseContent />
    </div>
  );
}

export default CourseDetails;
