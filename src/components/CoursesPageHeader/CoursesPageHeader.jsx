import "./CoursesPageHeader.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { sortBy } from "../../data/sortBy";
import Button from "../Button/Button";
import Select from "../Select/Select";

function CoursesPageHeader() {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);

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
          <Select
            text={"Paid or Free"}
            options={[
              { id: 1, name: "Paid" },
              { id: 2, name: "Free" },
            ]}
          />

          <Select text={"Sort by Latest"} options={sortBy} name={"sortBy"} />

          <Select text={"All Categories"} options={categories} />
        </div>
      </div>
    </header>
  );
}

export default CoursesPageHeader;
