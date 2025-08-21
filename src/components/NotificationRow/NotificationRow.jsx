import { TbTrash } from "react-icons/tb";
import "./NotificationRow.css";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotification,
  readNotification,
} from "../../features/notifications/notificationsThunk";
import { useNavigate } from "react-router-dom";

function NotificationRow({ num, notification }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notification: not } = useSelector((state) => state.notifications);

  const handlReadNotification = () => {
    dispatch(readNotification(notification.id));
  };

  const handldeleteNotification = () => {
    dispatch(deleteNotification(notification.id));
  };

  const handleSeeNotificationDetails = async () => {
    const resultAction = await dispatch(readNotification(notification.id));
    if (readNotification.fulfilled.match(resultAction)) {
      switch (notification.type) {
        case "course_review":
        case "new_subscriber": {
          navigate(`/courses/${not.id}`);
          break;
        }

        case "new_follower":
          navigate(`/profile`);
          break;

        default:
          navigate("/notifications");
      }
    }
  };

  return (
    <div
      className={`notification-row ${!notification.read_at ? "not-read" : ""}`}
    >
      <p className="id">{num}</p>
      <p className="not-content">{notification.message}</p>
      <p className="created-at">{notification.created_at}</p>
      <button className="mark-as-read" onClick={handlReadNotification}>
        <MdOutlineMarkEmailUnread />
      </button>
      <button className="delete" onClick={handldeleteNotification}>
        <TbTrash />
      </button>
      <button className="details" onClick={handleSeeNotificationDetails}>
        See more
      </button>
    </div>
  );
}

export default NotificationRow;
