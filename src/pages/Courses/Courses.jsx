import { useDispatch, useSelector } from "react-redux";
import CoursesGroup from "../../components/CoursesGroup/CoursesGroup";
import CoursesPageHeader from "../../components/CoursesPageHeader/CoursesPageHeader";
import "./Courses.css";
import { useEffect } from "react";
import { getAllCourses } from "../../features/courses/coursesThunk";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { clearCourseError } from "../../features/courses/coursesSlice";
import NoCourses from "../../components/NoCourses/NoCourses";

function Courses() {
  const dispatch = useDispatch();
  const { loading, error, courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(clearCourseError());
    if (courses?.length === 0) dispatch(getAllCourses());
  }, [dispatch, courses?.length]);

  return (
    <div>
      <CoursesPageHeader />

      {loading && <Loader />}

      {error && <ErrorMessage error={error} />}

      {!loading && !error && !courses?.length && <NoCourses />}

      {!loading && !error && courses?.length > 0 && (
        <CoursesGroup courses={courses} />
      )}
    </div>
  );
}

export default Courses;
