import "./CoursesPageHeader.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { approval_status, price, sortBy } from "../../data/sortBy";
import Button from "../Button/Button";
import Select from "../Select/Select";
import { useEffect, useState } from "react";
import {
  filterCourses,
  getAllCourses,
} from "../../features/courses/coursesThunk";
import { FaSearch } from "react-icons/fa";

function CoursesPageHeader({ setIsFiltering }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [search_key, setSearch_key] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isFree, setIsFree] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const filters = {};

    if (search_key) filters.search_key = search_key;
    if (selectedCategoryId) filters.category_id = selectedCategoryId;
    if (isFree === "1") filters.only_free = 1;
    if (isFree === "0") filters.order_by_price = "desc";

    if (selectedSort) {
      switch (selectedSort) {
        case "1":
          filters.order_by_oldest = 0;
          break;
        case "2":
          filters.order_by_oldest = 1;
          break;
        case "3":
          filters.order_by_rating = "desc";
          break;
        case "4":
          filters.order_by_price = "asc";
          break;
        case "5":
          filters.order_by_subscribers = "desc";
          break;
        default:
          break;
      }
    }

    if (selectedStatus) {
      filters.approval_status = selectedStatus;
    }

    dispatch(filterCourses(filters));
  };

  useEffect(() => {
    if (!search_key) dispatch(getAllCourses());
  }, [search_key, dispatch]);

  useEffect(() => {
    const filters = {};

    if (search_key) filters.search_key = search_key;
    if (selectedCategoryId) filters.category_id = selectedCategoryId;
    if (isFree === "1") filters.only_free = 1;
    if (isFree === "0") filters.order_by_price = "desc";

    if (selectedSort) {
      switch (selectedSort) {
        case "1":
          filters.order_by_oldest = 0;
          break;
        case "2":
          filters.order_by_oldest = 1;
          break;
        case "3":
          filters.order_by_rating = "desc";
          break;
        case "4":
          filters.order_by_price = "asc";
          break;
        case "5":
          filters.order_by_price = "desc";
          break;
        case "6":
          filters.order_by_subscribers = "desc";
          break;
        default:
          break;
      }
    }

    if (selectedStatus) {
      filters.approval_status = selectedStatus;
    }

    dispatch(filterCourses(filters));
  }, [selectedCategoryId, isFree, selectedSort, selectedStatus, dispatch]);

  useEffect(() => {
    const activeFilter =
      search_key ||
      selectedCategoryId ||
      isFree !== "" ||
      selectedSort ||
      selectedStatus;

    setIsFiltering(!!activeFilter);
  }, [
    search_key,
    selectedCategoryId,
    isFree,
    selectedSort,
    selectedStatus,
    setIsFiltering,
  ]);

  return (
    <header className="courses-page-header">
      <div>
        <h1>Courses</h1>
        <Button className={"primary"} onClick={() => navigate("create")}>
          &#43; Add Course
        </Button>
      </div>

      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search in your courses..."
            value={search_key}
            onChange={(e) => setSearch_key(e.target.value)}
          />
          <Button className={"primary"} type={"submit"}>
            <FaSearch />
          </Button>
        </form>

        <div>
          <Select
            text={"All status"}
            options={approval_status}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          />

          <Select
            text={"Paid and Free"}
            options={price}
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
            options={[{ id: "", name: "All Categories" }, ...categories]}
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}

export default CoursesPageHeader;
