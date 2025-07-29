import "./NoPosts.css";
import noPosts from "./../../assets/images/noPosts.png";

function NoPosts() {
  return (
    <div className="no-posts">
      <img src={noPosts} alt="No Posts img" />
      <p>
        You haven't created any posts yet. Start by sharing your first post with
        your students!
      </p>
    </div>
  );
}

export default NoPosts;
