import { useDispatch, useSelector } from "react-redux";
import CoursesGroup from "../../components/CoursesGroup/CoursesGroup";
import CoursesPageHeader from "../../components/CoursesPageHeader/CoursesPageHeader";
import "./Courses.css";
import { useEffect } from "react";
import { getAllCourses } from "../../features/courses/coursesThunk";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function Courses() {
  const dispatch = useDispatch();
  const { loading, error, courses } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courses?.length === 0) dispatch(getAllCourses());
  }, [dispatch, courses?.length]);

  return (
    <div>
      <CoursesPageHeader />

      {loading && <Loader />}

      {error && <ErrorMessage error={error} />}

      {!loading && !error && !courses?.length && <p>No Courses Found</p>}

      {!loading && !error && courses?.length > 0 && (
        <CoursesGroup courses={courses} />
      )}
    </div>
  );
}

export default Courses;
