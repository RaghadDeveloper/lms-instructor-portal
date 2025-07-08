import "./LessonComments.css";
import img from "./../../assets/images/profileImg.jpg";

function LessonComments() {
  return (
    <div className="lesson-comments card">
      <h2>Comments:</h2>
      <div className="comment">
        <img className="user-img" src={img} />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur,
          dolorem iste. Ea odit natus vel reiciendis similique quibusdam non
          maxime fugit repellendus dicta. Eos iusto quisquam dolorum autem.
          Eveniet, rem.
        </p>
      </div>
    </div>
  );
}

export default LessonComments;
