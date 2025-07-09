import "./ArticleCard.css";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import img from "./../../assets/images/profileImg.jpg";
import video from "./../../assets/images/video.mp4";

function ArticleCard() {
  return (
    <>
      {/* text */}
      <div className="article-card">
        <header className="article-card-header">
          <img src={img} className="user-img" />
          <div>
            <h4 className="user-name">user name</h4>
            <p className="article-date">Updated at 28 jun</p>
          </div>
        </header>
        <div className="article-body">
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
        <div className="article-footer">
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
      <div className="article-card">
        <header className="article-card-header">
          <img src={img} className="user-img" />
          <div>
            <h4 className="user-name">user name</h4>
            <p className="article-date">Created at 12 Feb</p>
          </div>
        </header>
        <div className="article-body">
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
        <div className="article-footer">
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
      <div className="article-card">
        <header className="article-card-header">
          <img src={img} className="user-img" />
          <div>
            <h4 className="user-name">user name</h4>
            <p className="article-date">Updated at 28 jun</p>
          </div>
        </header>
        <div className="article-body">
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
          <video controls>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="article-footer">
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

export default ArticleCard;
