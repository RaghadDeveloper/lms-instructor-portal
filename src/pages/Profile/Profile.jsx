import "./Profile.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import FollowersList from "../../components/FollowersList/FollowersList";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

function Profile() {
  const { loading, error } = useSelector((state) => state.profile);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="profile">
      <ProfileCard />
      <FollowersList />
    </div>
  );
}

export default Profile;
