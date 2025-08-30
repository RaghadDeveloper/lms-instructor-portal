import VideoCard from "../VideoCard/VideoCard";
import "./CourseContent.css";
import Button from "../Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { deleteCourse } from "../../features/courses/coursesThunk";
import { useState } from "react";

function CourseContent({ lessons }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.courses);
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    const result = await dispatch(deleteCourse(courseId));
    if (deleteCourse.fulfilled.match(result)) {
      navigate("/courses");
    } else alert("Course doesn't deleted,please try again!");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="course-content"
      >
        <h3>Course Content</h3>

        {lessons?.map((lesson, index) => (
          <VideoCard key={index} num={index + 1} lesson={lesson} />
        ))}

        {!lessons && <p>This course doesn't have any lesson.</p>}

        {course.quiz && (
          <h4
            className="quiz"
            onClick={() =>
              navigate(`/courses/${courseId}/quiz/${course.quiz.id}`)
            }
          >
            Quiz details
          </h4>
        )}

        {lessons && !course.quiz && (
          <Button
            className={"border"}
            onClick={() => navigate(`/courses/${courseId}/quiz/create`)}
          >
            &#43; Add Quiz
          </Button>
        )}

        <Button className={"border"} onClick={() => navigate("lesson/create")}>
          &#43; Add Video
        </Button>

        <Button
          className={"border"}
          onClick={() => navigate(`/courses/edit/${courseId}`)}
        >
          Edit course
        </Button>
        <Button className={"border"} onClick={() => setShowDelete(true)}>
          Delete this course
        </Button>
      </motion.div>
      {showDelete && (
        <>
          <div className="modal-overlay" onClick={() => setShowDelete(false)} />
          <div className="delete-modal">
            <p>Are you sure you want to delete this Course?</p>
            <Button className={"danger"} onClick={handleDelete}>
              Yes
            </Button>
            <span onClick={() => setShowDelete(false)}>&times;</span>
          </div>
        </>
      )}
    </>
  );
}

export default CourseContent;
