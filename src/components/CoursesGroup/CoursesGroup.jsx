import { useSelector } from "react-redux";
import CourseCard from "../CourseCard/CourseCard";
import "./CoursesGroup.css";

function CoursesGroup() {
  const { courses } = useSelector((state) => state.courses);

  return (
    <div className="courses">
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default CoursesGroup;
