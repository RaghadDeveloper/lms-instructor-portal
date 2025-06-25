import { useSelector } from "react-redux";
import CourseCard from "../CourseCard/CourseCard";
import "./CoursesGroup.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function CoursesGroup({ courses }) {
  const { loading, error } = useSelector((state) => state.courses);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div className="courses">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default CoursesGroup;
