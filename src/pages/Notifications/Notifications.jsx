import "./Notifications.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllNotifications,
  readAllNotifications,
} from "../../features/notifications/notificationsThunk";
import NotificationTableHeader from "../../components/NotificationTableHeader/NotificationTableHeader";
import NotificationRow from "../../components/NotificationRow/NotificationRow";
import NoNotifications from "../../components/NoNotifications/NoNotifications";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

function Notifications() {
  const dispatch = useDispatch();
  const { loading, error, notifications } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  const handleReadAllNotification = () => {
    dispatch(readAllNotifications());
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  if (!notifications) return <NoNotifications />;

  return (
    <div className="notifications">
      <h1>Notifications</h1>
      <p className="read-all" onClick={handleReadAllNotification}>
        Mark all as read
      </p>
      <div className="notification-table">
        <NotificationTableHeader />
        {notifications.map((notification, index) => (
          <NotificationRow
            key={index}
            num={index + 1}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
}

export default Notifications;
