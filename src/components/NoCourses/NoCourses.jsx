import "./NoCourses.css";
import noCourses from "./../../assets/images/noCourses.png";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function NoCourses() {
  const navigate = useNavigate();
  return (
    <div className="no-courses">
      <img src={noCourses} alt="No Courses img" />
      <p>
        You haven’t created any courses yet. Start by creating your first one!
      </p>
      <Button className={"border"} onClick={() => navigate("create")}>
        Create a course
      </Button>
    </div>
  );
}

export default NoCourses;
