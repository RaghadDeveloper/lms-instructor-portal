import CoursesGroup from "../../components/CoursesGroup/CoursesGroup";
import CoursesPageHeader from "../../components/CoursesPageHeader/CoursesPageHeader";
import "./Courses.css";

function Courses() {
  return (
    <div>
      <CoursesPageHeader />
      <CoursesGroup />
    </div>
  );
}

export default Courses;
