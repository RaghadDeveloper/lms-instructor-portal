import "./CoursesPageHeader.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sortBy } from "../../data/sortBy";
import Button from "../Button/Button";
import Select from "../Select/Select";
import { useEffect, useState } from "react";
import {
  getAllCourses,
  searchCourses,
} from "../../features/courses/coursesThunk";

function CoursesPageHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [search_key, setSearch_key] = useState("");

  useEffect(() => {
    if (!search_key) dispatch(getAllCourses());
    else dispatch(searchCourses({ search_key }));
  }, [search_key, dispatch]);

  return (
    <header className="courses-page-header">
      <div>
        <h1>Courses</h1>
        <Button className={"primary"} onClick={() => navigate("create")}>
          &#43; Add Course
        </Button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search in your courses..."
          value={search_key}
          onChange={(e) => setSearch_key(e.target.value)}
        />
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
