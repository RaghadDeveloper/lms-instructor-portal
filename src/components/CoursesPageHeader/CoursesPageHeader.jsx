import "./CoursesPageHeader.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "../Button/Button";
import Select from "../Select/Select";
import {
  getCourses,
  searchCourseTitle,
} from "../../features/courses/coursesThunk";
import { clearTitles } from "../../features/courses/coursesSlice";
import { approval_status, price, sortBy } from "../../data/courseFilter";

function CoursesPageHeader({ setIsFiltering, page }) {
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
    page,
  });
  const [selectedTitle, setSelectedTitle] = useState(-1);

  const skipNextSearchTitleFetch = useRef(false);
  const searchRef = useRef(null);

  const {
    selectedCategoryId,
    isFree,
    selectedSort,
    selectedStatus,
    searchKey,
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

  const buildRequestFilters = () => {
    const req = { page };

    if (searchKey) req.search_key = searchKey;
    if (selectedCategoryId) req.category_id = selectedCategoryId;
    if (isFree === "1") req.only_free = 1;
    if (isFree === "0") req.order_by_price = "desc";

    switch (selectedSort) {
      case "1":
        req.order_by_oldest = 0;
        break;
      case "2":
        req.order_by_oldest = 1;
        break;
      case "3":
        req.order_by_rating = "desc";
        break;
      case "4":
        req.order_by_price = "asc";
        break;
      case "5":
        req.order_by_price = "desc";
        break;
      case "6":
        req.order_by_subscribers = "desc";
        break;
    }

    if (selectedStatus) req.approval_status = selectedStatus;

    return req;
  };

  const handleSearch = async (e, customSearchKey = null) => {
    if (e) e.preventDefault();

    skipNextSearchTitleFetch.current = true;

    const updatedKey = customSearchKey ?? searchKey;
    setFilters((prev) => ({ ...prev, searchKey: updatedKey }));

    await dispatch(clearTitles());
    await dispatch(
      getCourses({
        ...buildRequestFilters(),
        search_key: updatedKey,
        page: 1,
      })
    );
    setSelectedTitle(-1);
  };

  useEffect(() => {
    dispatch(getCourses({ ...buildRequestFilters(), page: 1 }));
  }, [selectedCategoryId, isFree, selectedSort, selectedStatus, dispatch]);

  useEffect(() => {
    dispatch(getCourses({ ...buildRequestFilters(), page }));
  }, [page, dispatch]);

  useEffect(() => {
    if (!searchKey) dispatch(getCourses({ ...buildRequestFilters(), page: 1 }));
  }, [searchKey, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        dispatch(clearTitles());
        setSelectedTitle(-1);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dispatch]);

  useEffect(() => {
    const delay = setTimeout(() => {
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

    return () => clearTimeout(delay);
  }, [searchKey, dispatch]);

  useEffect(() => {
    const active = Object.values(filters).some((val) => val);
    setIsFiltering(active);
  }, [filters, setIsFiltering]);

  return (
    <header className="courses-page-header">
      <div>
        <h1>Courses</h1>
        <Button className="primary" onClick={() => navigate("create")}>
          &#43; Add Course
        </Button>
      </div>

      <div>
        <div className="search" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search in your courses..."
              value={filters.searchKey}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchKey: e.target.value }))
              }
              onKeyDown={handleKeyDown}
            />
            <Button className="primary" type="submit">
              <FaSearch />
            </Button>
          </form>

          {titles?.length > 0 && filters.searchKey && (
            <div className="search-options">
              {titles.map((title, idx) => (
                <p
                  key={idx}
                  className={`title ${selectedTitle === idx ? "active" : ""}`}
                  onClick={() => handleSearch(null, title.title)}
                >
                  {title.title}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="filter">
          <Select
            text="All status"
            options={approval_status}
            value={filters.selectedStatus}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                selectedStatus: e.target.value,
              }))
            }
          />
          <Select
            text="Paid and Free"
            options={price}
            value={filters.isFree}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, isFree: e.target.value }))
            }
          />
          <Select
            text="Sort by Latest"
            options={sortBy}
            value={filters.selectedSort}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, selectedSort: e.target.value }))
            }
          />
          <Select
            text="All Categories"
            options={[{ id: "", name: "All Categories" }, ...categories]}
            value={filters.selectedCategoryId}
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
