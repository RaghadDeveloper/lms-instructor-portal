import "./CoursesPageHeader.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CoursesPageHeader() {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  return (
    <header className="courses-page-header">
      <div>
        <h1>Courses</h1>
        <Button className={"primary"} onClick={() => navigate("create")}>
          &#43; Add Course
        </Button>
      </div>
      <div>
        <input type="text" placeholder="Search in your courses..." />
        <div>
          <select>
            <option value="latest">Sort by Latest</option>
            <option value="oldest">Sort by Oldest</option>
            <option value="rating">Sort by Rating</option>
            <option value="price">Sort by Price</option>
            <option value="enrolled">Sort by Enrolled</option>
          </select>

          <select>
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export default CoursesPageHeader;
