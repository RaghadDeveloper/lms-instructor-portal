import { useDispatch, useSelector } from "react-redux";
import CoursesGroup from "../../components/CoursesGroup/CoursesGroup";
import CoursesPageHeader from "../../components/CoursesPageHeader/CoursesPageHeader";
import "./Courses.css";
import { useEffect } from "react";
import { getAllCourses } from "../../features/courses/coursesThunk";

function Courses() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courses.length === 0) dispatch(getAllCourses());
  }, [dispatch, courses.length]);

  return (
    <div>
      <CoursesPageHeader />
      <CoursesGroup courses={courses} />
    </div>
  );
}

export default Courses;
