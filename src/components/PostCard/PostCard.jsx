import "./PostCard.css";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import img from "./../../assets/images/profileImg.jpg";
import video from "./../../assets/images/video.mp4";

function PostCard() {
  return (
    <>
      {/* text */}
      <div className="post-card">
        <header className="post-card-header">
          <img src={img} className="user-img" />
          <div>
            <h4 className="user-name">user name</h4>
            <p className="post-date">Updated at 28 jun</p>
          </div>
        </header>
        <div className="post-body">
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            iure commodi nostrum! Delectus provident inventore officia odit
            aspernatur labore corrupti placeat dolor minima. Ab quibusdam
            ratione, cupiditate corporis perferendis maxime. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Accusantium iure commodi
            nostrum! Delectus provident inventore officia odit aspernatur labore
            corrupti placeat dolor minima. Ab quibusdam ratione, cupiditate
            corporis perferendis maxime.
          </p>
        </div>
        <div className="post-footer">
          <div>
            <AiOutlineLike />
            <span>102</span>
          </div>
          <div className="divider"></div>
          <div>
            <FaRegComment />
            <span>102</span>
          </div>
        </div>
      </div>

      {/* img */}
      <div className="post-card">
        <header className="post-card-header">
          <img src={img} className="user-img" />
          <div>
            <h4 className="user-name">user name</h4>
            <p className="post-date">Created at 12 Feb</p>
          </div>
        </header>
        <div className="post-body">
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            iure commodi nostrum! Delectus provident inventore officia odit
            aspernatur labore corrupti placeat dolor minima. Ab quibusdam
            ratione, cupiditate corporis perferendis maxime. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Accusantium iure commodi
            nostrum! Delectus provident inventore officia odit aspernatur labore
            corrupti placeat dolor minima. Ab quibusdam ratione, cupiditate
            corporis perferendis maxime.
          </p>
          <img src={img} className="img" />
        </div>
        <div className="post-footer">
          <div>
            <AiOutlineLike />
            <span>102</span>
          </div>
          <div className="divider"></div>
          <div>
            <FaRegComment />
            <span>102</span>
          </div>
        </div>
      </div>

      {/* video */}
      <div className="post-card">
        <header className="post-card-header">
          <img src={img} className="user-img" />
          <div>
            <h4 className="user-name">user name</h4>
            <p className="post-date">Updated at 28 jun</p>
          </div>
        </header>
        <div className="post-body">
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            iure commodi nostrum! Delectus provident inventore officia odit
            aspernatur labore corrupti placeat dolor minima. Ab quibusdam
            ratione, cupiditate corporis perferendis maxime. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Accusantium iure commodi
            nostrum! Delectus provident inventore officia odit aspernatur labore
            corrupti placeat dolor minima. Ab quibusdam ratione, cupiditate
            corporis perferendis maxime.
          </p>
          <video className="video" controls>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="post-footer">
          <div>
            <AiOutlineLike />
            <span>102</span>
          </div>
          <div className="divider"></div>
          <div>
            <FaRegComment />
            <span>102</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
