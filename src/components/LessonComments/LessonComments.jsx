import "./LessonComments.css";
import img from "./../../assets/images/profileImg.jpg";
import { AiOutlineLike } from "react-icons/ai";
import Comment from "../Comment/Comment";

function LessonComments() {
  return (
    <div className="lesson-comments card">
      <h2>Comments:</h2>
      <div className="comment">
        <img className="user-img" src={img} />
        <div className="user-comment">
          <p>
            <h4>user name</h4>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur,
            dolorem iste. Ea odit natus vel reiciendis similique quibusdam non
            maxime fugit repellendus dicta. Eos iusto quisquam dolorum autem.
            Eveniet, rem.
          </p>
          <div className="actions">
            <div>
              <span>Like</span>
              <span>Reply</span>
            </div>
            <div>
              16
              <AiOutlineLike />
            </div>
          </div>
        </div>
      </div>
      <div className="comment reply">
        <img className="user-img" src={img} />
        <div className="user-comment">
          <p>
            <h4>user name</h4>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur,
            dolorem iste. Ea odit natus vel reiciendis similique quibusdam non
            maxime fugit repellendus dicta. Eos iusto quisquam dolorum autem.
            Eveniet, rem.
          </p>
          <div className="actions">
            <div>
              <span>Like</span>
              <span>Reply</span>
            </div>
            <div>
              16
              <AiOutlineLike />
            </div>
          </div>
        </div>
      </div>
      <div className="comment">
        <img className="user-img" src={img} />
        <div className="user-comment">
          <p>
            <h4>user name</h4>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur,
            dolorem iste. Ea odit natus vel reiciendis similique quibusdam non
            maxime fugit repellendus dicta. Eos iusto quisquam dolorum autem.
            Eveniet, rem.
          </p>
          <div className="actions">
            <div>
              <span>Like</span>
              <span>Reply</span>
            </div>
            <div>
              16
              <AiOutlineLike />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonComments;
