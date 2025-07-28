import "./Profile.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import FollowersList from "../../components/FollowersList/FollowersList";

function Profile() {
  return (
    <div className="profile">
      <ProfileCard />
      <FollowersList />
    </div>
  );
}

export default Profile;
