import "./Profile.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import FollowersList from "../../components/FollowersList/FollowersList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import {
  getMyFollowers,
  getProfile,
} from "../../features/profile/profileThunks";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function Profile() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getMyFollowers());
  }, [dispatch]);

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
