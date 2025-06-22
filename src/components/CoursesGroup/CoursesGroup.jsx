import { useSelector } from "react-redux";
import CourseCard from "../CourseCard/CourseCard";
import "./CoursesGroup.css";

function CoursesGroup({ courses }) {
  const { loading, error } = useSelector((state) => state.course);
  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="error">{error}</p>;
  return (
    <div className="courses">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default CoursesGroup;
