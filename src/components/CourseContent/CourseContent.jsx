import VideoCard from "../VideoCard/VideoCard";
import "./CourseContent.css";
import Button from "../Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function CourseContent({ lessons }) {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.courses);

  return (
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
    </motion.div>
  );
}

export default CourseContent;
