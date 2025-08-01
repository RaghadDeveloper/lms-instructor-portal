import "./Notifications.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllNotifications } from "../../features/notifications/notificationsThunk";
import { TbTrash } from "react-icons/tb";
import NotificationTableHeader from "../../components/NotificationTableHeader/NotificationTableHeader";
import NotificationRow from "../../components/NotificationRow/NotificationRow";

function Notifications() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  return (
    <div className="notifications">
      <h1>Notifications</h1>
      <p className="read-all">Mark all as read</p>
      <div className="notification-table">
        <NotificationTableHeader />
        {notifications.map((notification, index) => (
          <NotificationRow index={index} notification={notification} />
        ))}
      </div>
    </div>
  );
}

export default Notifications;
