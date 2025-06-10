import "./CoursesPageHeader.css";
import Button from "../Button/Button";

function CoursesPageHeader() {
  return (
    <header className="courses-page-header">
      <div>
        <h1>Courses</h1>
        <Button>Add Course</Button>
      </div>
      <div>
        <input type="text" placeholder="Search in your courses..." />
        <div>
          <select>
            <option value="latest">Sort by Latest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
          <select>
            <option value="all">All Category</option>
            <option value="web">web development</option>
            <option value="graphic">graphic design</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default CoursesPageHeader;
