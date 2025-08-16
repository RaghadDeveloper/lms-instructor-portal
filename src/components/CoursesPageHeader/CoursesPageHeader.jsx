import "./CoursesPageHeader.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { approval_status, price, sortBy } from "../../data/courseFilter";
import Button from "../Button/Button";
import Select from "../Select/Select";
import { useEffect, useRef, useState } from "react";
import {
  filterCourses,
  getAllCourses,
  searchCourseTitle,
} from "../../features/courses/coursesThunk";
import { FaSearch } from "react-icons/fa";
import { clearTitles } from "../../features/courses/coursesSlice";

function CoursesPageHeader({ setIsFiltering }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const { titles } = useSelector((state) => state.courses);

  const [filters, setFilters] = useState({
    searchKey: "",
    selectedCategoryId: "",
    isFree: "",
    selectedSort: "",
    selectedStatus: "",
  });
  const [selectedTitle, setSelectedTitle] = useState(-1);

  const skipNextSearchTitleFetch = useRef(false);
  const searchRef = useRef(null);

  const {
    searchKey,
    selectedCategoryId,
    isFree,
    selectedSort,
    selectedStatus,
  } = filters;

  const handleKeyDown = (e) => {
    if (selectedTitle < Math.min(17, titles?.length)) {
      if (e.key === "ArrowUp" && selectedTitle > 0) {
        setSelectedTitle((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedTitle < Math.min(17, titles?.length) - 1
      ) {
        setSelectedTitle((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedTitle >= 0) {
        setFilters((prev) => ({
          ...prev,
          searchKey: titles[selectedTitle].title,
        }));
        dispatch(clearTitles());
        setSelectedTitle(-1);
      }
    } else {
      setSelectedTitle(-1);
    }
  };

  const handleSearch = async (e, customSearchKey = null) => {
    if (e) e.preventDefault();

    skipNextSearchTitleFetch.current = true;

    const finalSearchKey = customSearchKey ?? searchKey;

    const requestFilters = {};

    if (finalSearchKey) requestFilters.search_key = finalSearchKey;
    if (selectedCategoryId) requestFilters.category_id = selectedCategoryId;
    if (isFree === "1") requestFilters.only_free = 1;
    if (isFree === "0") requestFilters.order_by_price = "desc";

    if (selectedSort) {
      switch (selectedSort) {
        case "1":
          requestFilters.order_by_oldest = 0;
          break;
        case "2":
          requestFilters.order_by_oldest = 1;
          break;
        case "3":
          requestFilters.order_by_rating = "desc";
          break;
        case "4":
          requestFilters.order_by_price = "asc";
          break;
        case "5":
          requestFilters.order_by_subscribers = "desc";
          break;
        default:
          break;
      }
    }

    if (selectedStatus) {
      requestFilters.approval_status = selectedStatus;
    }

    await dispatch(clearTitles());
    await dispatch(filterCourses(requestFilters));
    setSelectedTitle(-1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        dispatch(clearTitles());
        setSelectedTitle(-1);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch]);

  useEffect(() => {
    const noActiveFilters =
      !searchKey &&
      !selectedCategoryId &&
      isFree === "" &&
      !selectedSort &&
      !selectedStatus;

    if (noActiveFilters) {
      dispatch(getAllCourses());
    }
  }, [
    searchKey,
    selectedCategoryId,
    isFree,
    selectedSort,
    selectedStatus,
    dispatch,
  ]);

  useEffect(() => {
    const requestFilters = {};

    if (searchKey) requestFilters.search_key = searchKey;
    if (selectedCategoryId) requestFilters.category_id = selectedCategoryId;
    if (isFree === "1") requestFilters.only_free = 1;
    if (isFree === "0") requestFilters.order_by_price = "desc";

    if (selectedSort) {
      switch (selectedSort) {
        case "1":
          requestFilters.order_by_oldest = 0;
          break;
        case "2":
          requestFilters.order_by_oldest = 1;
          break;
        case "3":
          requestFilters.order_by_rating = "desc";
          break;
        case "4":
          requestFilters.order_by_price = "asc";
          break;
        case "5":
          requestFilters.order_by_price = "desc";
          break;
        case "6":
          requestFilters.order_by_subscribers = "desc";
          break;
        default:
          break;
      }
    }

    if (selectedStatus) {
      requestFilters.approval_status = selectedStatus;
    }

    dispatch(filterCourses(requestFilters));
  }, [selectedCategoryId, isFree, selectedSort, selectedStatus, dispatch]);

  useEffect(() => {
    const activeFilter =
      searchKey ||
      selectedCategoryId ||
      isFree !== "" ||
      selectedSort ||
      selectedStatus;

    setIsFiltering(!!activeFilter);
  }, [
    searchKey,
    selectedCategoryId,
    isFree,
    selectedSort,
    selectedStatus,
    setIsFiltering,
  ]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (skipNextSearchTitleFetch.current) {
        skipNextSearchTitleFetch.current = false;
        return;
      }

      if (searchKey.trim()) {
        dispatch(searchCourseTitle(searchKey.trim()));
      } else {
        dispatch(clearTitles());
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchKey, dispatch]);

  return (
    <header className="courses-page-header">
      <div>
        <h1>Courses</h1>
        <Button className={"primary"} onClick={() => navigate("create")}>
          &#43; Add Course
        </Button>
      </div>

      <div>
        <div className="search" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search in your courses..."
              value={searchKey}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchKey: e.target.value }))
              }
              onKeyDown={handleKeyDown}
            />
            <Button className={"primary"} type={"submit"}>
              <FaSearch />
            </Button>
          </form>
          {titles?.length > 0 && searchKey && (
            <div className="search-options">
              {titles?.map((title, index) => (
                <p
                  key={index}
                  className={`title ${selectedTitle === index ? "active" : ""}`}
                  onClick={async () => {
                    setFilters((prev) => ({
                      ...prev,
                      searchKey: title.title,
                    }));
                    await dispatch(clearTitles());
                    setSelectedTitle(-1);
                    handleSearch(null, title.title);
                  }}
                >
                  {title.title}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="filter">
          <Select
            text={"All status"}
            options={approval_status}
            value={selectedStatus}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                selectedStatus: e.target.value,
              }))
            }
          />

          <Select
            text={"Paid and Free"}
            options={price}
            value={isFree}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, isFree: e.target.value }))
            }
          />

          <Select
            text={"Sort by Latest"}
            options={sortBy}
            name={"sortBy"}
            value={selectedSort}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, selectedSort: e.target.value }))
            }
          />

          <Select
            text={"All Categories"}
            options={[{ id: "", name: "All Categories" }, ...categories]}
            value={selectedCategoryId}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                selectedCategoryId: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </header>
  );
}

export default CoursesPageHeader;
