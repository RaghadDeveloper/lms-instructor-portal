import "./CourseInfo.css";
import courseImg from "./../../assets/images/courseImg.png";
import { FaRegUser, FaStar } from "react-icons/fa";

function CourseInfo() {
  return (
    <div className="course-info">
      <img src={courseImg} />

      <div className="about">
        <h4>Requirement to Start</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cumque
          laborum soluta delectus magni nam iure nihil? Voluptatum consectetur
          dicta quo expedita non, corrupti quaerat unde fugit explicabo nam
          voluptatibus.
        </p>
      </div>

      <div className="about">
        <h4>Description</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cumque
          laborum soluta delectus magni nam iure nihil? Voluptatum consectetur
          dicta quo expedita non, corrupti quaerat unde fugit explicabo nam
          voluptatibus.
        </p>
      </div>

      <div className="row">
        <div>
          <h4>Price </h4>
          <span>$50.00</span>
        </div>

        <div>
          <h4>Duration </h4>
          <span>12Hr 30Min</span>
        </div>

        <div>
          <h4>Lessons </h4>
          <span>24</span>
        </div>

        <div>
          <h4>Rating</h4>
          <div>
            <FaStar className="star" />
            <span>4.5</span>
          </div>
        </div>

        <div>
          <h4>students</h4>
          <div>
            <FaRegUser />
            <span>23</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
