import { useDispatch, useSelector } from "react-redux";
import CoursesGroup from "../../components/CoursesGroup/CoursesGroup";
import CoursesPageHeader from "../../components/CoursesPageHeader/CoursesPageHeader";
import "./Courses.css";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../features/courses/coursesThunk";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { clearCourseError } from "../../features/courses/coursesSlice";
import NoCourses from "../../components/NoCourses/NoCourses";
import NoResults from "../../components/NoResults/NoResults";

function Courses() {
  const dispatch = useDispatch();
  const { loading, error, courses } = useSelector((state) => state.courses);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    dispatch(clearCourseError());
    if (courses?.length === 0) dispatch(getAllCourses());
  }, [dispatch, courses?.length]);

  return (
    <div>
      <CoursesPageHeader setIsFiltering={setIsFiltering} />

      {loading && <Loader />}

      {error && <ErrorMessage error={error} />}

      {!loading &&
        !error &&
        !courses?.length &&
        (isFiltering ? <NoResults /> : <NoCourses />)}

      {!loading && !error && courses?.length > 0 && (
        <CoursesGroup courses={courses} />
      )}
    </div>
  );
}

export default Courses;
