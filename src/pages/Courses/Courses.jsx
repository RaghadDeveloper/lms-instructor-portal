import { useSelector } from "react-redux";
import CoursesGroup from "../../components/CoursesGroup/CoursesGroup";
import CoursesPageHeader from "../../components/CoursesPageHeader/CoursesPageHeader";
import "./Courses.css";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import NoCourses from "../../components/NoCourses/NoCourses";
import NoResults from "../../components/NoResults/NoResults";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function Courses() {
  const [page, setPage] = useState(1);
  const { loading, error, courses, pagination } = useSelector(
    (state) => state.courses
  );
  const [isFiltering, setIsFiltering] = useState(false);

  return (
    <div>
      <CoursesPageHeader setIsFiltering={setIsFiltering} page={page} />

      {loading && <Loader />}

      {error && <ErrorMessage error={error} />}

      {!loading &&
        !error &&
        !courses?.length &&
        (isFiltering ? <NoResults /> : <NoCourses />)}

      {!loading && !error && courses?.length > 0 && (
        <>
          <CoursesGroup courses={courses} />
          <div className="courses-pagination-controls">
            <button
              disabled={!pagination.prev}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <GrFormPrevious />
            </button>
            {pagination.pages.map((page) => (
              <span key={page.page} onClick={() => setPage(page.page)}>
                {page.page}
              </span>
            ))}
            <button
              disabled={!pagination.next}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <GrFormNext />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Courses;
