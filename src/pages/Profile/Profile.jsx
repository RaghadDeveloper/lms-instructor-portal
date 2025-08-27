import "./Profile.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import FollowersList from "../../components/FollowersList/FollowersList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useEffect, useRef } from "react";
import {
  getMyFollowers,
  getProfile,
} from "../../features/profile/profileThunks";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function Profile() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.profile);
  const didFetch = useRef(false);

  useEffect(() => {
    if (!didFetch.current) {
      dispatch(getProfile());
      dispatch(getMyFollowers(1));
      didFetch.current = true;
    }
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
