import "./CoursesPageHeader.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sortBy } from "../../data/sortBy";
import Button from "../Button/Button";
import Select from "../Select/Select";
import { useEffect, useState } from "react";
import {
  filterCourses,
  getAllCourses,
  searchCourses,
} from "../../features/courses/coursesThunk";

function CoursesPageHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [search_key, setSearch_key] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isFree, setIsFree] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    if (!search_key) dispatch(getAllCourses());
    else dispatch(searchCourses({ search_key }));
  }, [search_key, dispatch]);

  useEffect(() => {
    const filters = {};

    if (selectedCategoryId) filters.category_id = selectedCategoryId;
    if (isFree === "1") filters.only_free = 1;
    if (isFree === "0") filters.only_free = 0;

    if (selectedSort) {
      switch (selectedSort) {
        case "1":
          filters.order_by_rating = "desc";
          break;
        case "2":
          filters.order_by_price = "asc";
          break;
        case "3":
          filters.order_by_subscribers = "desc";
          break;
        default:
          break;
      }
    }

    dispatch(filterCourses(filters));
  }, [selectedCategoryId, isFree, selectedSort, dispatch]);

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
              { id: 0, name: "Paid" },
              { id: 1, name: "Free" },
            ]}
            value={isFree}
            onChange={(e) => setIsFree(e.target.value)}
          />

          <Select
            text={"Sort by Latest"}
            options={sortBy}
            name={"sortBy"}
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          />

          <Select
            text={"All Categories"}
            options={categories}
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}

export default CoursesPageHeader;
